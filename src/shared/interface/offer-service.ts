import { DocumentType } from '@typegoose/typegoose';
import {
  CreateOfferDto,
  OfferEntity,
  UpdateOfferDto,
} from '../modules/offer/index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto,
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByCityPremiumOfferId(
    cityId: string,
    count?: number,
  ): Promise<DocumentType<OfferEntity>[] | null>;
  findByFavoritesOffers(): Promise<DocumentType<OfferEntity>[] | null>;
}
