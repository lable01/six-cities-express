import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpError } from '../../libs/rest/index.js';
import { Component } from '../../const/index.js';
import { Logger, OfferService } from '../../interface/index.js';
import { HttpMethod } from '../../enum/index.js';
import { fillDTO } from '../../helpers/common.js';
import { FullOfferRdo } from './rdo/full-offer-dto.js';
import { CreateOfferDto } from './dto/create-offer-dto.js';
import { UpdateOfferDto } from './dto/update-offer-dto.js';
import { ShortOfferRdo } from './rdo/short-offer-dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

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
      handler: this.findOne,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
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

  public async findOne(req: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.findById(req.params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${req.params.offerId} not found.`,
        'OfferController',
      );
    }

    const responseData = fillDTO(FullOfferRdo, existsOffer);
    this.ok(res, responseData);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const result = await this.offerService.deleteById(req.params.offerId);

    this.noContent(res, result);
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
}
