import { NextFunction, Request, Response } from 'express';

export interface MiddlewareContract {
  execute(req: Request, res: Response, next: NextFunction): void;
}
