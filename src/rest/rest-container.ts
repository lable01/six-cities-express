import { Container } from 'inversify';
import { RestApp } from './rest-app.js';
import { Component } from '../shared/enum/index.js';
import { Config, DatabaseClient, Logger } from '../shared/interface/index.js';
import { PinoLogger } from '../shared/libs/pino-logger/index.js';
import { RestSchemaData } from '../shared/types/index.js';
import { RestConfig } from '../shared/libs/config/index.js';
import { MongoDatabaseClient } from '../shared/libs/mongo-database-client/index.js';

export function createRestAppContainer() {
  const restAppContainer = new Container();

  restAppContainer
    .bind<RestApp>(Component.RestApp)
    .to(RestApp)
    .inSingletonScope();
  restAppContainer
    .bind<Logger>(Component.Logger)
    .to(PinoLogger)
    .inSingletonScope();
  restAppContainer
    .bind<Config<RestSchemaData>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  restAppContainer
    .bind<DatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();

  return restAppContainer;
}
