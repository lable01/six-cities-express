import { CityName } from '../enum/index.js';
import { Location } from './location.js';

export type CityData = {
  name: CityName;
  location: Location;
};
