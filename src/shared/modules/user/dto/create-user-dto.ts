import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import {
  USER_NAME_LENGTH,
  USER_PASSWORD_LENGTH,
} from '../../../const/index.js';
import { TypeUser } from '../../../enum/index.js';

export class CreateUserDto {
  @IsString()
  @Length(USER_NAME_LENGTH.MIN, USER_NAME_LENGTH.MAX)
  public name!: string;

  @IsEmail()
  public email!: string;

  @IsString()
  public avatarUrl!: string;

  @IsEnum(TypeUser)
  public typeUser!: TypeUser;

  @IsString()
  @Length(USER_PASSWORD_LENGTH.MIN, USER_PASSWORD_LENGTH.MAX)
  public password!: string;
}
