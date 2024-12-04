import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  DocumentExistsContract,
  MiddlewareContract,
} from '../../../interface/index.js';
import { HttpError } from '../errors/http-error.js';

export class DocumentExistsMiddleware implements MiddlewareContract {
  constructor(
    private readonly service: DocumentExistsContract,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute(
    { params }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const documentId = params[this.paramName];
    if (!(await this.service.exists(documentId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
        'DocumentExistsMiddleware',
      );
    }

    next();
  }
}
