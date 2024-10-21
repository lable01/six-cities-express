import { DocumentType } from '@typegoose/typegoose';
import { CityEntity, CreateCityDto } from '../modules/city/index.js';

export interface CityService {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findByCityId(cityId: string): Promise<DocumentType<CityEntity> | null>;
  findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null>;
  findByCityNameOrCreate(
    cityName: string,
    dto: CreateCityDto,
  ): Promise<DocumentType<CityEntity>>;
}
