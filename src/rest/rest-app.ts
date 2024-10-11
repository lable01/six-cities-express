import { Logger } from '../shared/interface/index.js';

export class RestApp {
  constructor(private readonly logger: Logger) {}

  public async init() {
    this.logger.info('Application initialization');
  }
}
