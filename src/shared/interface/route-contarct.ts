import { NextFunction, Request, Response } from 'express';
import { HttpMethod } from '../enum/index.js';
import { MiddlewareContract } from './middleware-contract.js';

export interface RouteContract {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: MiddlewareContract[];
}
