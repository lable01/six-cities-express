import { Goods, HousingType } from '../../../enum/index.js';
import { LocationData } from '../../../types/location.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsMongoId,
  IsObject,
  IsOptional,
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
import { Type } from 'class-transformer';
import { LocationDto } from '../../location/index.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @Length(OFFER_TITLE_LENGTH.MIN, OFFER_TITLE_LENGTH.MAX)
  public title?: string;

  @IsOptional()
  @IsString()
  @Length(OFFER_DESCRIPTION_LENGTH.MIN, OFFER_DESCRIPTION_LENGTH.MAX)
  public description?: string;

  @IsOptional()
  @IsDate()
  public date?: Date;

  @IsOptional()
  @IsMongoId()
  public cityId?: string;

  @IsOptional()
  @IsString()
  public previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(PHOTOS_LENGTH)
  @ArrayMaxSize(PHOTOS_LENGTH)
  public images?: string[];

  @IsOptional()
  @IsBoolean()
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(HousingType)
  public type?: HousingType;

  @IsOptional()
  @IsInt()
  @Min(ROOMS_NUMBER.MIN)
  @Max(ROOMS_NUMBER.MAX)
  public numberRooms?: number;

  @IsOptional()
  @IsInt()
  @Min(ADULTS_NUMBER.MIN)
  @Max(ADULTS_NUMBER.MAX)
  public maxAdults?: number;

  @IsOptional()
  @IsInt()
  @Min(PRICE.MIN)
  @Max(PRICE.MAX)
  public price?: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique<Goods>()
  public goods?: Goods[];

  @IsOptional()
  @IsMongoId()
  public userId?: string;

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => LocationDto)
  public location?: LocationData;
}
