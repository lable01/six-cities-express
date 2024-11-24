import { FileReader } from '../../interface/index.js';
import { CityData, OfferData, UserData } from '../../types/index.js';
import { CityName, Goods, HousingType } from '../../enum/index.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { LocationData } from '../../types/location.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): OfferData {
    const [
      title,
      description,
      date,
      city,
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
      name,
      email,
      avatarUrl,
      typeUser,
      numberComments,
      latitudeOffer,
      longitudeOffer,
    ] = line.split('\t');

    return {
      title,
      description,
      date: new Date(date),
      city: this.parseLocation(city as CityName, latitudeCity, longitudeCity),
      previewImage: previewImage,
      images: this.parseArrayString(images),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseInt(rating),
      type: type as HousingType,
      numberRooms: this.parseInt(numberRooms),
      maxAdults: this.parseInt(maxAdults),
      price: this.parseInt(price),
      goods: this.parseGoods(goods),
      user: this.parseUser(name, email, avatarUrl, typeUser),
      numberComments: this.parseInt(numberComments),
      location: this.parseLocationOffer(latitudeOffer, longitudeOffer),
    };
  }

  private parseLocation(
    city: CityName,
    latitude: string,
    longitude: string,
  ): CityData {
    return {
      name: city,
      location: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
    };
  }

  private parseArrayString(arrayString: string): string[] {
    return arrayString.split(';');
  }

  private parseGoods(arrayString: string): Goods[] | [] {
    if (arrayString.trim() === '') {
      return [];
    }

    const array = arrayString.split(';');

    return array.map((item) => {
      if (Object.values(Goods).includes(item as Goods)) {
        return item as Goods;
      }
      throw new Error(`Invalid Goods value: ${item}`);
    });
  }

  private parseBoolean(booleanString: string): boolean {
    return booleanString === 'true';
  }

  private parseInt(intString: string): number {
    return Number.parseInt(intString, 10);
  }

  private parseUser(
    name: string,
    email: string,
    avatarUrl: string,
    typeUser: string,
  ): UserData {
    return {
      name,
      email,
      avatarUrl,
      typeUser,
    };
  }

  private parseLocationOffer(
    latitudeOffer: string,
    longitudeOffer: string,
  ): LocationData {
    return {
      latitude: Number(latitudeOffer),
      longitude: Number(longitudeOffer),
    };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);

        // this.emit('line', parsedOffer);

        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
