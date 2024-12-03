import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user-rdo.js';
import { Goods, HousingType } from '../../../enum/index.js';
import { LocationRdo } from '../../location/index.js';

export class ShortOfferRdo {
  @Expose({ name: '_id' })
  @Transform((value) => value.obj._id.toString())
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
  public cityId!: string;

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
  public userId!: UserRdo;

  @Expose()
  @Type(() => LocationRdo)
  public location!: LocationRdo;
}
