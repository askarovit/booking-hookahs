import { Request, Response } from 'express'

export abstract class BaseController {
  abstract createItem(req: Request, res: Response): void;
  abstract deleteItem?(req: Request, res: Response): void;
}
