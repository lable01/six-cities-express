import { CityName } from '../../../enum/index.js';
import { LocationData } from '../../../types/location.js';
import { IsEnum, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from '../../location/index.js';

export class CreateCityDto {
  @IsEnum(CityName)
  public name: CityName;

  @ValidateNested()
  @IsObject()
  @Type(() => LocationDto)
  public location: LocationData;
}
