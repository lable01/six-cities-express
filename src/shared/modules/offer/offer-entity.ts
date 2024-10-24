import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';

import { UserEntity } from '../user/index.js';
import { CityEntity } from '../city/index.js';
import { Goods, HousingType } from '../../enum/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public date!: Date;

  @prop({
    ref: CityEntity,
    required: true,
  })
  public cityId!: Ref<CityEntity>;

  @prop()
  public previewImage!: string;

  @prop({
    type: () => [String],
    default: [],
  })
  public images!: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public rating!: number;

  @prop({
    enum: HousingType,
  })
  public type!: HousingType;

  @prop()
  public numberRooms!: number;

  @prop()
  public maxAdults!: number;

  @prop()
  public price!: number;

  @prop({
    type: String,
    enum: Goods,
    default: [],
  })
  public goods!: Goods[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public numberComments!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
