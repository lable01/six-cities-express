import { CityName } from '../enum/index.js';
import { LocationData } from './location.js';

export type CityData = {
  name: CityName;
  location: LocationData;
};
