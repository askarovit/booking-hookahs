import { Router } from 'express';
import { HookahController as ctrl } from 'controller';

const router = Router();

router.get('/', ctrl.getList);
router.post('/', ctrl.createItem);
router.delete('/', ctrl.deleteItem);

export default router;
