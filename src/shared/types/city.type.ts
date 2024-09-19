import { CityName } from '../enum/index.js';
import { Coordinates } from './coordinates.types.js';

export type CityData = {
  name: CityName;
  location: Coordinates;
};
