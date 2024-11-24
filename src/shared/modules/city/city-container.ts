import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CityService } from '../../interface/index.js';
import { Component } from '../../enum/index.js';
import { CityEntity, CityModel } from './city-entity.js';
import { DefaultCityService } from './default-city-service.js';

export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer
    .bind<CityService>(Component.CityService)
    .to(DefaultCityService)
    .inSingletonScope();
  cityContainer
    .bind<types.ModelType<CityEntity>>(Component.CityModel)
    .toConstantValue(CityModel);

  return cityContainer;
}
