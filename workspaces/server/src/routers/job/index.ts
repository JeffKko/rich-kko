import { Request, Response, Router } from 'express'
import alertBot from '../../jobs/alertBot'
import defaultHandler from '../defaultHandler'

const router = Router();
const jobHandler = defaultHandler(null)

const createJobCallback = (method: Function) => async (req: Request, res: Response) => {
  try {
    await method()
    return {
      data: 'ok',
      status: 200,
    }
  } catch (error) {
    return {
      message: 'some error',
      status: 400,
    }
  }
}

router.get('/perHour', jobHandler(createJobCallback(alertBot.perHour)))
router.get('/per4Hour', jobHandler(createJobCallback(alertBot.per4Hour)))
router.get('/perDay', jobHandler(createJobCallback(alertBot.perDay)))
router.get('/perWeek', jobHandler(createJobCallback(alertBot.perWeek)))
router.get('/test', jobHandler(async () => {
  console.log('here is some log.')
  return {
    data: 'ok',
    status: 200,
  }
}))

export default router