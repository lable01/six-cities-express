import {
  Config,
  Controller,
  DatabaseClient,
  ExceptionFilter,
  Logger,
} from '../shared/interface/index.js';
import { RestSchemaData } from '../shared/types/index.js';
import { inject, injectable } from 'inversify';
import { getMongoURI } from '../shared/helpers/index.js';
import { Component } from '../shared/const/index.js';
import express, { Express } from 'express';

@injectable()
export class RestApp {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,
    @inject(Component.Config)
    private readonly config: Config<RestSchemaData>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient,
    @inject(Component.CityController)
    private readonly cityController: Controller,
    @inject(Component.ExceptionFilter)
    private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.UserController)
    private readonly userController: Controller,
    @inject(Component.OfferController)
    private readonly offerController: Controller,
  ) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/city', this.cityController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
  }

  private async initMiddleware() {
    this.server.use(express.json());
  }

  private async initExceptionFilters() {
    this.server.use(
      this.appExceptionFilter.catch.bind(this.appExceptionFilter),
    );
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info('Init database');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server');
    await this.initServer();
    this.logger.info(
      `Server started on http://localhost:${this.config.get('PORT')}`,
    );
  }
}
