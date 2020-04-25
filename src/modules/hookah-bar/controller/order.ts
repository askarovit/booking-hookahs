import { Request, Response } from 'express';
import { BaseController } from 'shared/BaseController';
import { ResponseEntity } from 'shared/model/responce';
import service from 'service/order';

class OrderController {

  async getListCustomers(req: Request, res: Response) {
    const data = await service.getListCustomers();
    const result = new ResponseEntity({ data });

    res.json(result)
  }

  async makeOrder(req: Request, res: Response) {
    const data = await service.makeOrder(<number>req.body.amount_people);
    const result = new ResponseEntity({ data });

    res.json(result);
  }
}

export default new OrderController();