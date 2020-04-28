import { Request, Response, NextFunction } from 'express';
import { BaseController } from 'shared/BaseController';
import { ResponseEntity } from 'shared/model/responce'
import { IHookahModel } from 'model/hookah';
import service from 'service/hookah';
import { validate } from 'middleware/validate';

class HookahController extends BaseController {

  @validate('GET_LIST_HOOKAHS')
  async getList(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: Array<IHookahModel> = await service.getHookahs();
      const result = new ResponseEntity({ data });

      res.json(result)
    } catch (err) {
      next(err);
    }
  }

  @validate('ADD_HOOKAH')
  async createItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: IHookahModel = await service.createHookah(req.body);
      const result = new ResponseEntity({ data });

      res.json(result)
    } catch (err) {
      return next(err);
    }
  }

  @validate('REMOVE_HOOKAH')
  async deleteItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: { affectedRows: boolean } = await service.deleteHookah(req.body);
      const result = new ResponseEntity({ data });

      res.json(result)
    } catch (err) {
      next(err);
    }
  }
}

export default new HookahController();