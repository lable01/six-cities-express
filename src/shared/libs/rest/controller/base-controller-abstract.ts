import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import {
  ControllerContract,
  LoggerContract,
  RouteContract,
} from '../../../interface/index.js';
import expressAsyncHandler from 'express-async-handler';

@injectable()
export abstract class BaseController implements ControllerContract {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private readonly _router: Router;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor(protected readonly logger: LoggerContract) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteContract) {
    const wrapperAsyncHandler = expressAsyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map((item) =>
      expressAsyncHandler(item.execute.bind(item)),
    );
    const allHandlers = middlewareHandlers
      ? [...middlewareHandlers, wrapperAsyncHandler]
      : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);
    this.logger.info(
      `Route registered: ${route.method.toUpperCase()} ${route.path}`,
    );
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    res.type(this.DEFAULT_CONTENT_TYPE).status(statusCode).json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
