import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  ValidateDtoMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../const/index.js';
import {
  CommentService,
  LoggerContract,
  OfferService,
} from '../../interface/index.js';
import { HttpMethod } from '../../enum/index.js';
import { CreateCommentRequest } from '../../types/index.js';
import { fillDTO } from '../../helpers/common.js';
import { CommentRdo } from './rdo/comment-rdo.js';
import { CreateCommentDto } from './dto/create-comment-dto.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: LoggerContract,
    @inject(Component.CommentService)
    private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)],
    });
  }

  public async create(
    { body }: CreateCommentRequest,
    res: Response,
  ): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController',
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
