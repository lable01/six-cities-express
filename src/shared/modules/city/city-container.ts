import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CityService, ControllerContract } from '../../interface/index.js';
import { CityEntity, CityModel } from './city-entity.js';
import { DefaultCityService } from './default-city-service.js';
import { Component } from '../../const/index.js';
import { CityController } from './city-controller.js';

export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer
    .bind<CityService>(Component.CityService)
    .to(DefaultCityService)
    .inSingletonScope();
  cityContainer
    .bind<types.ModelType<CityEntity>>(Component.CityModel)
    .toConstantValue(CityModel);
  cityContainer
    .bind<ControllerContract>(Component.CityController)
    .to(CityController)
    .inSingletonScope();

  return cityContainer;
}
