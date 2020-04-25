import { Router } from 'express';
import { OrderController as ctrl } from 'controller';

const router = Router();

router.get('/customers', ctrl.getListCustomers);
router.post('/make', ctrl.makeOrder);

export default router;
