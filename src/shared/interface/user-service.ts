import {
  CreateUserDto,
  UpdateUserDto,
  UserEntity,
} from '../modules/user/index.js';
import { DocumentType } from '@typegoose/typegoose';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<UserEntity>>;
  updateById(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<DocumentType<UserEntity> | null>;
  addFavorite(
    userId: string,
    offerId: string,
  ): Promise<DocumentType<UserEntity> | null>;
  deleteFavorite(
    userId: string,
    offerId: string,
  ): Promise<DocumentType<UserEntity> | null>;
}
