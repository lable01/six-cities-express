import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { BaseController } from '../../libs/rest/index.js';
import { Component } from '../../const/index.js';
import { CityService, Logger } from '../../interface/index.js';
import { HttpMethod } from '../../enum/index.js';

@injectable()
export class CityController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CityService)
    private readonly cityService: CityService,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const city = await this.cityService.find();
    this.ok(res, city);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
}
