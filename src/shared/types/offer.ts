import { Goods, HousingType } from '../enum/index.js';
import { UserData } from './user.js';
import { CityData } from './city.js';
import { LocationData } from './location.js';

export type OfferData = {
  title: string;
  description: string;
  date: Date;
  city: CityData;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  numberRooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  user: UserData;
  numberComments: number;
  location: LocationData;
};
