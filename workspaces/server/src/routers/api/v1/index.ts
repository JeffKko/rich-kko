import { Request, Response, Router } from 'express';
import authRouter from './auth';
import exBoxRouter from './ecBox';
import discord from './discord';

const router = Router();

router.use('/auth', authRouter);
router.use('/ecBox', exBoxRouter);

router.get('/discord', discord);

export default router;
