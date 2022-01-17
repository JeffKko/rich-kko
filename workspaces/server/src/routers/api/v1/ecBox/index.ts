import { Router } from 'express';
import EcBoxController from './EcBox.controller';
import defaultHandler from '../../../../routers/defaultHandler';

const ecBoxController = new EcBoxController();
const ecBoxHandler = defaultHandler<EcBoxController>(ecBoxController);
const router = Router();

router.get('/product/:id', ecBoxHandler(ecBoxController.getProduct));

router.post('/product', ecBoxHandler(ecBoxController.createProduct));

router.patch('/product/:id', ecBoxHandler(ecBoxController.updateProduct));

router.delete('/product/:id', ecBoxHandler(ecBoxController.removeProduct));

export default router;
