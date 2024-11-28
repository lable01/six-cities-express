import { Config, DatabaseClient, Logger } from '../shared/interface/index.js';
import { RestSchemaData } from '../shared/types/index.js';
import { inject, injectable } from 'inversify';
import { getMongoURI } from '../shared/helpers/index.js';
import { Component } from '../shared/const/index.js';

@injectable()
export class RestApp {
  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,
    @inject(Component.Config)
    private readonly config: Config<RestSchemaData>,
    @inject(Component.DatabaseClient)
    private readonly databaseClient: DatabaseClient,
  ) {}

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

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info('Init database');
    await this.initDb();
    this.logger.info('Init database completed');
  }
}
