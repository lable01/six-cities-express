import { inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { CityService, Logger } from '../../interface/index.js';
import { Component } from '../../enum/index.js';
import { CityEntity } from './city-entity.js';
import { CreateCityDto } from './dto/create-city-dto.js';

export class DefaultCityService implements CityService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CityModel)
    private readonly cityModel: types.ModelType<CityEntity>,
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(`New city created: ${dto.name}`);
    return result;
  }

  public async findByCityId(
    cityId: string,
  ): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId).exec();
  }

  public async findByCityName(
    cityName: string,
  ): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name: cityName }).exec();
  }

  public async findByCityNameOrCreate(
    cityName: string,
    dto: CreateCityDto,
  ): Promise<DocumentType<CityEntity>> {
    const existedCategory = await this.findByCityName(cityName);

    if (existedCategory) {
      return existedCategory;
    }

    return this.create(dto);
  }
}
