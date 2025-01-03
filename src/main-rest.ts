import 'reflect-metadata';
import { Container } from 'inversify';
import { createRestAppContainer, RestApp } from './rest/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createCityContainer } from './shared/modules/city/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';
import { Component } from './shared/const/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestAppContainer(),
    createUserContainer(),
    createCityContainer(),
    createOfferContainer(),
    createCommentContainer(),
  );
  const application = appContainer.get<RestApp>(Component.RestApp);
  await application.init();
}

await bootstrap();
