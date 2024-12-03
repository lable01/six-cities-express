import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../const/index.js';
import {
  CommentService,
  LoggerContract,
  OfferService,
} from '../../interface/index.js';
import { HttpMethod } from '../../enum/index.js';
import { fillDTO } from '../../helpers/common.js';
import { FullOfferRdo } from './rdo/full-offer-dto.js';
import { CreateOfferDto } from './dto/create-offer-dto.js';
import { UpdateOfferDto } from './dto/update-offer-dto.js';
import { ShortOfferRdo } from './rdo/short-offer-dto.js';
import { ParamOfferId } from '../../types/index.js';
import { CommentRdo } from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: LoggerContract,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
    @inject(Component.CommentService)
    private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(FullOfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
    console.log('Raw result:', result);
    const responseData = fillDTO(ShortOfferRdo, result);
    console.log('Transformed response data:', responseData);
    this.created(res, fillDTO(ShortOfferRdo, result));
  }

  public async show(req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(req.params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController',
      );
    }

    const responseData = fillDTO(FullOfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete(
    { params }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.updateById(
      req.params.offerId,
      req.body as UpdateOfferDto,
    );

    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(FullOfferRdo, result));
  }

  public async getComments(
    { params }: Request<ParamOfferId>,
    res: Response,
  ): Promise<void> {
    if (!(await this.offerService.exists(params.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController',
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
