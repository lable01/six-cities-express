import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentService } from '../../interface/index.js';
import { DefaultCommentService } from './default-comment-service.js';
import { CommentEntity, CommentModel } from './comment-entity.js';
import { Component } from '../../const/index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
