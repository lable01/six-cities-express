import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity } from '../modules/offer/index.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
