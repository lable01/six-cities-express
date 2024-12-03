import { Response, Router } from 'express';
import { RouteContract } from './route-contarct.js';

export interface ControllerContract {
  readonly router: Router;
  addRoute(route: RouteContract): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
}
