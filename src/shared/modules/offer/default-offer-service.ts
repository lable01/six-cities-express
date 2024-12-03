import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { LoggerContract, OfferService } from '../../interface/index.js';
import {
  Component,
  DEFAULT_CITY_FAVORITES_OFFER_COUNT,
  DEFAULT_OFFER_COUNT,
  INC_COMMENT_COUNT_NUMBER,
} from '../../const/index.js';
import { CreateOfferDto, OfferEntity, UpdateOfferDto } from '../offer/index.js';
import {
  getOffersDetails,
  populateAuthor,
  populateComments,
} from './offer-aggregation.js';
import { Types } from 'mongoose';
import { SortType } from '../../enum/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: LoggerContract,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count || DEFAULT_OFFER_COUNT;

    return this.offerModel
      .aggregate([
        ...getOffersDetails,
        { $sort: { createdAt: SortType.Down } },
        { $limit: limit },
      ])
      .exec();
  }

  public async findById(
    offerId: string,
  ): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .aggregate([
        { $match: { _id: new Types.ObjectId(offerId) } },
        ...populateAuthor,
        ...populateComments,
      ])
      .exec();
    return result[0] || null;
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

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
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

  public async incCommentCount(
    offerId: string,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentCount: INC_COMMENT_COUNT_NUMBER,
        },
      })
      .exec();
  }
}
