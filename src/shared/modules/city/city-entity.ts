import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { CityData } from '../../types/index.js';
import { CityName } from '../../enum/index.js';
import { LocationEntity } from './location-entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'city',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps implements CityData {
  @prop({ required: true, trim: true, type: () => String, enum: CityName })
  public name!: CityName;

  @prop({ required: true, _id: false })
  public location!: LocationEntity;
}

export const CityModel = getModelForClass(CityEntity);
