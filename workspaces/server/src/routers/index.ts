import { Router } from 'express'
import apiRouter from './api'
import jobRouter from './job'
import RootController from './Root.controller'
import defaultHandler from './defaultHandler'

const rootController = new RootController()
const rootHandler = defaultHandler<RootController>(rootController)
const router = Router();

router.use('/api', apiRouter)
router.use('/job', jobRouter)

router.get('/test', rootHandler(rootController.getTestMessage))

export default router