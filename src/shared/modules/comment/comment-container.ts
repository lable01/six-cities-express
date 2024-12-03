import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentService, ControllerContract } from '../../interface/index.js';
import { DefaultCommentService } from './default-comment-service.js';
import { CommentEntity, CommentModel } from './comment-entity.js';
import { Component } from '../../const/index.js';
import CommentController from './comment-controller.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  commentContainer
    .bind<ControllerContract>(Component.CommentController)
    .to(CommentController)
    .inSingletonScope();

  return commentContainer;
}
