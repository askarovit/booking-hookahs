import { Request, Response } from 'express';
import { BaseController } from 'shared/BaseController';
import { ResponseEntity } from 'shared/model/responce'
import { IHookahModel } from 'model/hookah';
import service from 'service/hookah';
import { validate } from 'middleware/validate';

class HookahController extends BaseController {

  @validate('GET_LIST_HOOKAHS')
  async getList(req: Request, res: Response) {
    const data = await service.getHookahs();
    const result = new ResponseEntity({ data });

    res.json(result)
  }

  @validate('ADD_HOOKAH')
  async createItem(req: Request, res: Response) {
    const data:IHookahModel = await service.createHookah(req.body);
    const result = new ResponseEntity({ data });

    res.json(result)
  }

  @validate('REMOVE_HOOKAH')
  async deleteItem(req: Request, res: Response) {
    const data = await service.deleteHookah(req.body);
    const result = new ResponseEntity({ data });

    res.json(result)
  }
}

export default new HookahController();