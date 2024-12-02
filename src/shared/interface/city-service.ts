import { DocumentType } from '@typegoose/typegoose';
import { CityEntity, CreateCityDto } from '../modules/city/index.js';

export interface CityService {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  find(): Promise<DocumentType<CityEntity>[]>;
}
