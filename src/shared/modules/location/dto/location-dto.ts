import { IsNumber } from 'class-validator';

export class LocationDto {
  @IsNumber()
  public latitude!: number;

  @IsNumber()
  public longitude!: number;
}
