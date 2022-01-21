import { Router } from 'express';
import AuthController from './Auth.controller';
import defaultHandler from '../../../../routers/defaultHandler';

const authController = new AuthController();
const authHandler = defaultHandler<AuthController>(authController);
const router = Router();

router.post('/google', authHandler(authController.google));

export default router;
