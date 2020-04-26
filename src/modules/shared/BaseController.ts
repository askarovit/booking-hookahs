import { Request, Response, NextFunction } from 'express'

export abstract class BaseController {
  abstract createItem(req: Request, res: Response, next: NextFunction): void;
  abstract deleteItem?(req: Request, res: Response, next: NextFunction): void;
}
