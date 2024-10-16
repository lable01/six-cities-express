import 'reflect-metadata';
import { Container } from 'inversify';
import { PinoLogger } from './shared/libs/pino-logger/index.js';
import { RestConfig } from './shared/libs/config/index.js';
import { RestApp } from './rest/index.js';
import { Component } from './shared/enum/index.js';
import { Config, Logger } from './shared/interface/index.js';
import { RestSchemaData } from './shared/types/index.js';

async function bootstrap() {
  const container = new Container();

  container.bind<RestApp>(Component.RestApp).to(RestApp).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container
    .bind<Config<RestSchemaData>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();

  const application = container.get<RestApp>(Component.RestApp);
  await application.init();
}

await bootstrap();
