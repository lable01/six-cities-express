import { TypeUser } from '../../../enum/index.js';

export class UpdateUserDto {
  public name?: string;
  public email?: string;
  public avatarUrl?: string;
  public typeUser?: TypeUser;
  public password?: string;
}
