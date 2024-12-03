import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { COMMENT_RATING, COMMENT_TEXT_LENGTH } from '../../../const/index.js';

export class CreateCommentDto {
  @IsString()
  @Length(COMMENT_TEXT_LENGTH.MIN, COMMENT_TEXT_LENGTH.MAX)
  public text!: string;

  @IsMongoId()
  public offerId!: string;

  @IsMongoId()
  public userId!: string;

  @IsInt()
  @Min(COMMENT_RATING.MIN)
  @Max(COMMENT_RATING.MAX)
  public rating!: number;
}
