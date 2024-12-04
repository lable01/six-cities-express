import { inject, injectable } from 'inversify';
import { Response } from 'express';

import {
  BaseController,
  HttpError,
  ValidateDtoMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../const/index.js';
import { ConfigContract, LoggerContract } from '../../interface/index.js';
import { HttpMethod } from '../../enum/index.js';
import { CreateUserRequest } from '../../types/create-user-request.js';
import { UserService } from '../../interface/user-service.js';
import { LoginUserRequest, RestSchemaData } from '../../types/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/common.js';
import { UserRdo } from './rdo/user-rdo.js';
import { CreateUserDto } from './dto/create-user-dto.js';
import { UpdateUserDto } from './dto/update-user-dto.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: LoggerContract,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config)
    private readonly configService: ConfigContract<RestSchemaData>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(UpdateUserDto)],
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController',
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT'),
    );
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
