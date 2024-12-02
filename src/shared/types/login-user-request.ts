import { Request } from 'express';
import { RequestParams } from './request-params.js';
import { RequestBody } from './request-body.js';
import { LoginUserDto } from '../modules/user/dto/login-user-dto.js';

export type LoginUserRequest = Request<
  RequestParams,
  RequestBody,
  LoginUserDto
>;
