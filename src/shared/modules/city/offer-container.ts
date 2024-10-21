import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { OfferService } from '../../interface/index.js';
import { Component } from '../../enum/index.js';
import { OfferEntity, OfferModel } from '../offer/index.js';
import { DefaultOfferService } from './default-offer-service.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer
    .bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService);
  offerContainer
    .bind<types.ModelType<OfferEntity>>(Component.OfferModel)
    .toConstantValue(OfferModel);

  return offerContainer;
}
