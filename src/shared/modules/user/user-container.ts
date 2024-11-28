import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { UserService } from '../../interface/user-service.js';
import { DefaultUserService } from './default-user-service.js';
import { UserEntity, UserModel } from './user-entity.js';
import { Component } from '../../const/index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer
    .bind<UserService>(Component.UserService)
    .to(DefaultUserService)
    .inSingletonScope();
  userContainer
    .bind<types.ModelType<UserEntity>>(Component.UserModel)
    .toConstantValue(UserModel);

  return userContainer;
}
