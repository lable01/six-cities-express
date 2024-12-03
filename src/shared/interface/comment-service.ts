import { CreateCommentDto } from '../modules/comment/dto/create-comment-dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from '../modules/comment/index.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
