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
    const cityData = {
      name: dto.name,
      location: dto.location,
    };

    const result = await this.cityModel.create(cityData);
    this.logger.info(`New city created: ${result.name}`);

    return result;
  }

  public async findOrCreate(
    dto: CreateCityDto,
  ): Promise<DocumentType<CityEntity>> {
    let city = await this.cityModel.findOne({ name: dto.name }).exec();

    if (!city) {
      city = await this.create(dto);
      this.logger.info(`City not found, created new city: ${city.name}`);
    } else {
      this.logger.info(`City found: ${city.name}`);
    }

    return city;
  }
}
