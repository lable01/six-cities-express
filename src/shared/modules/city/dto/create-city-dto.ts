import { CityName } from '../../../enum/index.js';
import { LocationData } from '../../../types/location.js';

export class CreateCityDto {
  public name: CityName;
  public location: LocationData;
}
