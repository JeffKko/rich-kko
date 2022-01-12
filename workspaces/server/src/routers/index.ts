import express from 'express'
import apiRouter from './api'
import jobRouter from './job'
import test from './test'

const router = express.Router();
router.use('/api', apiRouter)
router.use('/job', jobRouter)

router.get('/test', test)

export default router