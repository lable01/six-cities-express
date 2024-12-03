import { Request } from 'express';
import { RequestParams } from './request-params.js';
import { RequestBody } from './request-body.js';
import { CreateCommentDto } from '../modules/comment/dto/create-comment-dto.js';

export type CreateCommentRequest = Request<
  RequestParams,
  RequestBody,
  CreateCommentDto
>;
