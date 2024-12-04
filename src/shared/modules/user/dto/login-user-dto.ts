import { IsEmail, IsString, Length } from 'class-validator';
import { USER_PASSWORD_LENGTH } from '../../../const/index.js';

export class LoginUserDto {
  @IsEmail()
  public email!: string;

  @IsString()
  @Length(USER_PASSWORD_LENGTH.MIN, USER_PASSWORD_LENGTH.MAX)
  public password!: string;
}
