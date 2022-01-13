import express from 'express'
import apiRouter from './api'
import jobRouter from './job'
import { TestController } from './test.controller'

const testController = new TestController()

const router = express.Router();

router.use('/api', apiRouter)
router.use('/job', jobRouter)

router.get('/test', testController.getTestMessage.bind(testController))

export default router