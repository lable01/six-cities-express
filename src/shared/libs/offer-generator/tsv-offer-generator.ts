import { OfferGenerator } from '../../interface/index.js';
import { MockServerData } from '../../types/index.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';
import {
  CityCoordinates,
  CityName,
  Goods,
  HousingType,
  TypeUser,
} from '../../enum/index.js';
import {
  MAX_ADULTS,
  MAX_COMMENTS,
  MAX_NUMBER_ROOM,
  MAX_PRICE,
  MAX_RATING,
  MIN_ADULTS,
  MIN_COMMENTS,
  MIN_NUMBER_ROOM,
  MIN_PRICE,
  MIN_RATING,
} from './const.js';
import dayjs from 'dayjs';
import { generateRandomValueCoordinates } from '../../helpers/common.js';

export class TSVOfferGenerator implements OfferGenerator {
  private city: CityName = CityName.Paris;
  private type: HousingType = HousingType.Apartment;
  private goods: Goods[] = [];
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const date = dayjs().toISOString();
    const cityName = this.generateCity().toString();
    const coordinates = CityCoordinates[this.city];
    const latitudeCity = coordinates.latitude;
    const longitudeCity = coordinates.longitude;
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const images = getRandomItems<string>(this.mockData.image).join(';');
    const isPremium = getRandomBoolean().toString();
    const isFavorite = getRandomBoolean().toString();
    const rating = Math.round(
      generateRandomValue(MIN_RATING, MAX_RATING),
    ).toString();
    const type = this.generateHousingType().toString();
    const numberRooms = Math.round(
      generateRandomValue(MIN_NUMBER_ROOM, MAX_NUMBER_ROOM),
    ).toString();
    const maxAdults = Math.round(
      generateRandomValue(MIN_ADULTS, MAX_ADULTS),
    ).toString();
    const price = Math.round(
      generateRandomValue(MIN_PRICE, MAX_PRICE),
    ).toString();
    const goods = this.generateGoods().join(';');
    const userName = getRandomItem<string>(this.mockData.nameUser);
    const email = getRandomItem<string>(this.mockData.email);
    const avatarUrl = getRandomItem<string>(this.mockData.avatarUrl);
    const typeUser = this.generateTypeUser();
    const numberComments = Math.round(
      generateRandomValue(MIN_COMMENTS, MAX_COMMENTS),
    ).toString();
    const latitudeOffer = latitudeCity + generateRandomValueCoordinates();
    const longitudeOffer = longitudeCity + generateRandomValueCoordinates();

    return [
      title,
      description,
      date,
      cityName,
      latitudeCity,
      longitudeCity,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      numberRooms,
      maxAdults,
      price,
      goods,
      userName,
      email,
      avatarUrl,
      typeUser,
      numberComments,
      latitudeOffer,
      longitudeOffer,
    ].join('\t');
  }

  private generateCity(): CityName {
    this.city = getRandomItem<CityName>(Object.values(CityName));
    return this.city;
  }

  private generateHousingType(): HousingType {
    this.type = getRandomItem<HousingType>(Object.values(HousingType));
    return this.type;
  }

  private generateGoods(): Goods[] | [] {
    this.goods = getRandomItems<Goods>(Object.values(Goods));
    return this.goods;
  }

  private generateTypeUser(): string {
    const keys = Object.keys(TypeUser) as (keyof typeof TypeUser)[];
    const randomKey = getRandomItem(keys);
    return TypeUser[randomKey];
  }
}
