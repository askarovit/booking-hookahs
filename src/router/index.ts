import { Router, Request, Response } from 'express';
import { ResponseEntity } from 'shared/model/responce';
import BarRouter from './bar';
import HookahRouter from './hookah';
import OrderRouter from './order';

const router = Router();

router.use('/bars', BarRouter);
router.use('/hookahs', HookahRouter);
router.use('/orders', OrderRouter);

router.use('*', (req: Request, res: Response) => {
  res
    .status(404)
    .json(new ResponseEntity({errors: 'Not found API.'}));
});

export default router;