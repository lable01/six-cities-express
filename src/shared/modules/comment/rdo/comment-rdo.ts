import { Expose, Transform, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user-rdo.js';
import { FullOfferRdo } from '../../offer/rdo/full-offer-dto.js';

export class CommentRdo {
  @Expose({ name: '_id' })
  @Transform((value) => value.obj._id.toString())
  public id: string;

  @Expose()
  public text: string;

  @Expose({ name: 'createdAt' })
  public createdDate: string;

  @Expose({ name: 'rating' })
  public rating: string;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose({ name: 'offerId' })
  @Type(() => FullOfferRdo)
  public offer: UserRdo;
}
