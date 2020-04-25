import { Request, Response } from 'express';
import { BaseController } from 'shared/BaseController';
import { ResponseEntity } from 'shared/model/responce';
import { IBarModel } from 'model/bar';
import service from 'service/bar';

class BarController extends BaseController {

  async getList(req: Request, res: Response) {
    const data = await service.getBars();
    const result = new ResponseEntity({ data });

    res.json(result)
  }

  async createItem(req: Request, res: Response) {
    const data:IBarModel = await service.createBar(req.body);
    const result = new ResponseEntity({ data });

    res.json(result);
  }

  async deleteItem(req: Request, res: Response) {
    const data = await service.deleteBar(<string>req.query.title);
    const result = new ResponseEntity({ data });

    res.json(result)
  }
}

export default new BarController();