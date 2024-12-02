import { DocumentType, types } from '@typegoose/typegoose';
import { UserService } from '../../interface/user-service.js';
import { UserEntity } from './user-entity.js';
import { CreateUserDto } from './dto/create-user-dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../const/index.js';
import { Logger } from '../../interface/index.js';
import { populateFavorites } from './user-aggregation.js';
import { UpdateUserDto } from './dto/update-user-dto.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(
    email: string,
  ): Promise<DocumentType<UserEntity> | null> {
    const result = await this.userModel
      .aggregate([{ $match: { email } }, populateFavorites])
      .exec();

    return result[0] || null;
  }

  public async findOrCreate(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true }).exec();
  }

  public async addFavorite(
    userId: string,
    offerId: string,
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $addToSet: { favorites: offerId },
        },
        { new: true },
      )
      .exec();
  }

  public async deleteFavorite(
    userId: string,
    offerId: string,
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          $pull: { favorites: offerId },
        },
        { new: true },
      )
      .exec();
  }
}
