import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Controller, OfferService } from '../../interface/index.js';
import { OfferController, OfferEntity, OfferModel } from '../offer/index.js';
import { DefaultOfferService } from './default-offer-service.js';
import { Component } from '../../const/index.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer
    .bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService);
  offerContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);
  offerContainer
    .bind<Controller>(Component.OfferController)
    .to(OfferController)
    .inSingletonScope();

  return offerContainer;
}
