import { Expose, Transform, Type } from 'class-transformer';
import { LocationRdo } from '../../location/index.js';
import { IsEnum } from 'class-validator';
import { CityName } from '../../../enum/index.js';

export class CityRdo {
  @Expose({ name: '_id' })
  @Transform((value) => value.obj._id.toString())
  public id: string;

  @Expose()
  @IsEnum(CityName)
  public name: string;

  @Expose()
  @Type(() => LocationRdo)
  public location: LocationRdo;
}
