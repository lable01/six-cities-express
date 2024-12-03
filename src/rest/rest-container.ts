import { Container } from 'inversify';
import { RestApp } from './rest-app.js';
import {
  ConfigContract,
  DatabaseClient,
  ExceptionFilter,
  LoggerContract,
} from '../shared/interface/index.js';
import { PinoLogger } from '../shared/libs/logger/index.js';
import { RestSchemaData } from '../shared/types/index.js';
import { RestConfig } from '../shared/libs/config/index.js';
import { MongoDatabaseClient } from '../shared/libs/mongo-database-client/index.js';
import { Component } from '../shared/const/index.js';
import { AppExceptionFilter } from '../shared/libs/rest/index.js';

export function createRestAppContainer() {
  const restAppContainer = new Container();

  restAppContainer
    .bind<RestApp>(Component.RestApp)
    .to(RestApp)
    .inSingletonScope();
  restAppContainer
    .bind<LoggerContract>(Component.Logger)
    .to(PinoLogger)
    .inSingletonScope();
  restAppContainer
    .bind<ConfigContract<RestSchemaData>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  restAppContainer
    .bind<DatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();
  restAppContainer
    .bind<ExceptionFilter>(Component.ExceptionFilter)
    .to(AppExceptionFilter)
    .inSingletonScope();

  return restAppContainer;
}
