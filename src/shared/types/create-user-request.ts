import { Request } from 'express';
import { RequestParams } from './request-params.js';
import { RequestBody } from './request-body.js';
import { CreateUserDto } from '../modules/user/index.js';

export type CreateUserRequest = Request<
  RequestParams,
  RequestBody,
  CreateUserDto
>;
