import { Goods, HousingType } from '../../../enum/index.js';
import { LocationData } from '../../../types/location.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public date?: Date;
  public cityId?: string;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public type?: HousingType;
  public numberRooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: Goods[];
  public userId?: string;
  public numberComments?: number;
  public location?: LocationData;
}
