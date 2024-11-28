import { Config, Logger } from '../../interface/index.js';
import { config } from 'dotenv';
import { configRestSchema } from './rest-schema.js';
import { RestSchemaData } from '../../types/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../const/index.js';

@injectable()
export class RestConfig implements Config<RestSchemaData> {
  private readonly config: RestSchemaData;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(
        // prettier-ignore
        'Can\'t read .env file. Perhaps the file does not exists.',
      );
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchemaData>(key: T): RestSchemaData[T] {
    return this.config[key];
  }
}
