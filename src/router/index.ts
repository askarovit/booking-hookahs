import BarRouter from './bar';
import HookahRouter from './hookah';
import OrderRouter from './order';
import { Router } from 'express';

const router = Router();

router.use('/bars', BarRouter);
router.use('/hookahs', HookahRouter);
router.use('/orders', OrderRouter);

export default router;