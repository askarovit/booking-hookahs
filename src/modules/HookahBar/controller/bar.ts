import { Request, Response, NextFunction } from 'express';
import { BaseController } from 'shared/BaseController';
import { ResponseEntity } from 'shared/model/responce';
import { IBarModel } from 'model/bar';
import service from 'service/bar';
import { validate } from 'middleware/validate';

class BarController extends BaseController {

  @validate('GET_LIST_BAR')
  async getList(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: Array<IBarModel> = await service.getBars();
      const result = new ResponseEntity({ data });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  @validate('ADD_BAR')
  async createItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: IBarModel = await service.createBar(req.body);
      const result = new ResponseEntity({ data });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  @validate('REMOVE_BAR')
  async deleteItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const { title } = <{title: string}> req.body;
      const data: { affectedRows: boolean } = await service.deleteBar(title);
      const result = new ResponseEntity({ data });

      res.json(result)
    } catch (err) {
      next(err);
    }
  }
}

export default new BarController();