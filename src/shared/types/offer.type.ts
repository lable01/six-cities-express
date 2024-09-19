import { Goods, HousingType } from '../enum/index.js';
import { UserData } from './user.type.js';
import { CityData } from './city.type.js';

export type OfferData = {
  title: string;
  description: string;
  date: string;
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
  goods: Goods;
  user: UserData;
  numberComments: number;
};
