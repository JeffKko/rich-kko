import { Router } from 'express'
import talk from './talk'

const router = Router();

router.get('/talk', talk)

export default router