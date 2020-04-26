import { Request, Response } from 'express';
import { BaseController } from 'shared/BaseController';
import { ResponseEntity } from 'shared/model/responce';
import { IBarModel } from 'model/bar';
import service from 'service/bar';
import { validate } from 'middleware/validate';

class BarController extends BaseController {

  @validate('GET_LIST_BAR')
  async getList(req: Request, res: Response) {
    const data = await service.getBars();
    const result = new ResponseEntity({ data });

    res.json(result);
  }

  @validate('ADD_BAR')
  async createItem(req: Request, res: Response) {
    const data:IBarModel = await service.createBar(req.body);
    const result = new ResponseEntity({ data });

    res.json(result);
  }

  @validate('REMOVE_BAR')
  async deleteItem(req: Request, res: Response) {
    const data = await service.deleteBar(<string>req.query.title);
    const result = new ResponseEntity({ data });

    res.json(result)
  }
}

export default new BarController();