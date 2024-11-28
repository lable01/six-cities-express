import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Logger, OfferService } from '../../interface/index.js';
import { SortType } from '../../enum/index.js';
import { Component } from '../../const/index.js';
import { CreateOfferDto, OfferEntity, UpdateOfferDto } from '../offer/index.js';
import { DEFAULT_CITY_FAVORITES_OFFER_COUNT } from '../../const/default-const.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .populate(['cityId', 'userId'])
      .exec();
  }

  public async findById(
    offerId: string,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['cityId', 'userId'])
      .exec();
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['cityId', 'userId'])
      .exec();
  }

  public async deleteById(
    offerId: string,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async findByCityPremiumOfferId(
    cityId: string,
    count?: number,
  ): Promise<DocumentType<OfferEntity>[] | null> {
    const filter = { cityId: cityId, isPremium: true };
    const limit = count ?? DEFAULT_CITY_FAVORITES_OFFER_COUNT;
    return this.offerModel
      .find({ filter }, {}, { limit })
      .populate(['cityId', 'userId'])
      .exec();
  }

  // prettier-ignore
  public async findByFavoritesOffers(): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({ isFavorite: true })
      .populate(['cityId', 'userId'])
      .exec();
  }
}
