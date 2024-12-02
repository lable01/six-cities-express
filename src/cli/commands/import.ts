import {
  CityService,
  Command,
  DatabaseClient,
  Logger,
  OfferService,
} from '../../shared/interface/index.js';
import { UserService } from '../../shared/interface/user-service.js';
import { ConsoleLogger } from '../../shared/libs/logger/index.js';
import {
  DefaultOfferService,
  OfferModel,
} from '../../shared/modules/offer/index.js';
import {
  CityModel,
  DefaultCityService,
} from '../../shared/modules/city/index.js';
import {
  DefaultUserService,
  UserModel,
} from '../../shared/modules/user/index.js';
import { MongoDatabaseClient } from '../../shared/libs/mongo-database-client/index.js';
import { OfferData } from '../../shared/types/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command-const.js';
import { getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

export class Import implements Command {
  private userService: UserService;
  private cityService: CityService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private readonly logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.cityService = new DefaultCityService(this.logger, CityModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedOffer(offer: OfferData, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: OfferData) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.user,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt,
    );

    const city = await this.cityService.findOrCreate({
      name: offer.city.name,
      location: offer.location,
    });

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      date: offer.date,
      cityId: city._id.toString(),
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      type: offer.type,
      numberRooms: offer.numberRooms,
      price: offer.price,
      maxAdults: offer.maxAdults,
      goods: offer.goods,
      userId: user._id.toString(),
      location: offer.location,
    });
  }

  private async onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    await this.databaseClient.disconnect();
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string,
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
