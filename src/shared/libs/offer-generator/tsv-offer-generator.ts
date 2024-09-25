import { OfferGenerator } from '../../interface/index.js';
import { MockServerData } from '../../types/mock-server-data.js';
import {
  generateRandomValue,
  getRandomBoolean,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';
import { CityCoordinates, CityName } from '../../enum/index.js';
import { MAX_RATING, MIN_RATING } from './const.js';

export class TSVOfferGenerator implements OfferGenerator {
  private city: CityName = CityName.Paris;
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const cityName = this.generateCity().toString();
    const coordinates = CityCoordinates[this.city];
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const images = getRandomItems<string>(this.mockData.image).join(';');
    const isPremium = getRandomBoolean().toString();
    const isFavorite = getRandomBoolean().toString();
    const rating = Math.round(generateRandomValue(MIN_RATING, MAX_RATING));
    console.log('Rating:', rating);

    return [
      title,
      description,
      cityName,
      latitude,
      longitude,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
    ].join('\t');
  }

  private generateCity(): CityName {
    this.city = getRandomItem<CityName>(Object.values(CityName));
    return this.city;
  }
}
