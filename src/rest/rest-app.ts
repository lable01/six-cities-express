import { Config, Logger } from '../shared/interface/index.js';
import { RestSchemaData } from '../shared/types/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/enum/index.js';

@injectable()
export class RestApp {
  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,
    @inject(Component.Config)
    private readonly config: Config<RestSchemaData>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
