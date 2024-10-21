import { FileReader } from '../../interface/index.js';
import { OfferData, UserData } from '../../types/index.js';
import { CityName, Goods, HousingType } from '../../enum/index.js';
import { LocationData } from '../../types/location.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

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
      latitude,
      longitude,
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
    ] = line.split('\t');

    console.log(numberComments);

    return {
      title,
      description,
      date: new Date(date),
      city: {
        name: city as CityName,
        location: this.parseLocation(latitude, longitude),
      },
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
    };
  }

  private parseLocation(latitude: string, longitude: string): LocationData {
    return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
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
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
