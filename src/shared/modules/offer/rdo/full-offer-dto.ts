import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user-rdo.js';
import { CityRdo } from '../../city/index.js';
import { Goods, HousingType } from '../../../enum/index.js';
import { LocationRdo } from '../../location/index.js';

export class FullOfferRdo {
  @Expose({ name: '_id' })
  public id!: string;

  @Expose()
  public createdAt!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: Date;

  @Expose()
  @Type(() => CityRdo)
  public city!: CityRdo;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public type!: HousingType;

  @Expose()
  public numberRooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: Goods[];

  @Expose()
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public location!: LocationRdo;
}
