import { Request, Response, Router } from 'express';
import exBoxRouter from './ecBox';
import discord from './discord';

const router = Router();

router.use('/ecBox', exBoxRouter);

router.get('/discord', discord);

export default router;
