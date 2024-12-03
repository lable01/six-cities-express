import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController } from '../../libs/rest/index.js';
import { Component } from '../../const/index.js';
import { CityService, LoggerContract } from '../../interface/index.js';
import { HttpMethod } from '../../enum/index.js';
import { fillDTO } from '../../helpers/common.js';
import { CityRdo } from './rdo/city-rdo.js';

@injectable()
export class CityController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: LoggerContract,
    @inject(Component.CityService)
    private readonly cityService: CityService,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const city = await this.cityService.find();
    const responseData = fillDTO(CityRdo, city);
    this.ok(res, responseData);
  }
}
