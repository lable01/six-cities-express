import { readFileSync } from 'node:fs';
import { FileReader } from '../interface/index.js';
import { OfferData } from '../types/index.js';
import { CityName, Goods, HousingType } from '../enum/index.js';
import { Location } from '../types/location.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): OfferData[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
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
    ] = line.split('\t');

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
    };
  }

  private parseLocation(latitude: string, longitude: string): Location {
    return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
  }

  private parseArrayString(arrayString: string): string[] {
    return arrayString.split(';');
  }

  private parseGoods(arrayString: string): Goods[] {
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

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): OfferData[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}