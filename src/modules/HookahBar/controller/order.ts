import { Request, Response, NextFunction } from 'express';
import { ResponseEntity } from 'shared/model/responce';
import { validate } from 'middleware/validate';
import service, { IListCustomers } from 'service/order';
import { IHookahModel } from 'model';

class OrderController {

  @validate('GET_LIST_CUSTOMERS')
  async getListCustomers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: Array<IListCustomers> = await service.getListCustomers();
      const result = new ResponseEntity({ data });

      res.json(result)
    } catch (err) {
      next(err);
    }
  }

  @validate('MAKE_ORDER')
  async makeOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: { message: string } = await service.makeOrder(req.body);
      const result = new ResponseEntity({ data });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  @validate('GET_FREE_HOOKAHS')
  async getFreeHookah(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: Array<IHookahModel> = await service.getFreeHookah(req.query);
      const result = new ResponseEntity({ data });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default new OrderController();