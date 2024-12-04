import { Goods, HousingType } from '../../../enum/index.js';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsMongoId,
  IsObject,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  OFFER_TITLE_LENGTH,
  OFFER_DESCRIPTION_LENGTH,
  PHOTOS_LENGTH,
  ROOMS_NUMBER,
  ADULTS_NUMBER,
  PRICE,
} from '../../../const/index.js';
import { LocationDto } from '../../location/index.js';
import { Type } from 'class-transformer';

export class CreateOfferDto {
  @IsString()
  @Length(OFFER_TITLE_LENGTH.MIN, OFFER_TITLE_LENGTH.MAX)
  public title!: string;

  @IsString()
  @Length(OFFER_DESCRIPTION_LENGTH.MIN, OFFER_DESCRIPTION_LENGTH.MAX)
  public description!: string;

  @IsDate()
  public date!: Date;

  @IsMongoId()
  public cityId!: string;

  @IsString()
  public previewImage!: string;

  @IsArray()
  @ArrayMaxSize(PHOTOS_LENGTH)
  public images!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsEnum(HousingType)
  public type!: HousingType;

  @IsInt()
  @Min(ROOMS_NUMBER.MIN)
  @Max(ROOMS_NUMBER.MAX)
  public numberRooms!: number;

  @IsInt()
  @Min(ADULTS_NUMBER.MIN)
  @Max(ADULTS_NUMBER.MAX)
  public maxAdults!: number;

  @IsInt()
  @Min(PRICE.MIN)
  @Max(PRICE.MAX)
  public price!: number;

  @IsArray()
  @ArrayUnique<Goods>()
  public goods!: Goods[];

  @IsMongoId()
  public userId!: string;

  @ValidateNested()
  @IsObject()
  @Type(() => LocationDto)
  public location!: LocationDto;
}
