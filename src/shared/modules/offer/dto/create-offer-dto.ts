import { Goods, HousingType } from '../../../enum/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public cityId: string;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: HousingType;
  public numberRooms: number;
  public maxAdults: number;
  public price: number;
  public goods: Goods[];
  public userId: string;
  public numberComments: number;
}
