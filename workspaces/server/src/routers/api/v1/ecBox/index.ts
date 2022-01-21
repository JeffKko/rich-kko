import { Router } from 'express';
import EcBoxController from './EcBox.controller';
import defaultHandler from '../../../../routers/defaultHandler';
import { jwtGuard } from '../../../../lib/JwtGuard';

const ecBoxController = new EcBoxController();
const ecBoxHandler = defaultHandler<EcBoxController>(ecBoxController);
const router = Router();

router.get('/product/:id', jwtGuard, ecBoxHandler(ecBoxController.getProduct));

router.post('/product', ecBoxHandler(ecBoxController.getProductList));

router.post('/product', ecBoxHandler(ecBoxController.createProduct));

router.patch('/product/:id', ecBoxHandler(ecBoxController.updateProduct));

router.delete('/product/:id', ecBoxHandler(ecBoxController.deleteProduct));

router.get('/pchomeTop', ecBoxHandler(ecBoxController.getPchomeTop));

export default router;
