import { Request, Response } from 'express';
import { BaseController } from 'shared/BaseController';
import { ResponseEntity } from 'shared/model/responce'
import { IHookahModel } from 'model/hookah';
import service from 'service/hookah';

class HookahController extends BaseController {

  async getList(req: Request, res: Response) {
    const data = await service.getHookahs();
    const result = new ResponseEntity({ data });

    res.json(result)
  }

  async createItem(req: Request, res: Response) {
    const data:IHookahModel = await service.createHookah(req.body);
    const result = new ResponseEntity({ data });

    res.json(result)
  }

  async deleteItem(req: Request, res: Response) {
    const data = await service.deleteHookah(req.body);
    const result = new ResponseEntity({ data });

    res.json(result)
  }
}

export default new HookahController();