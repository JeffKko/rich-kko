import { Request, Response, Router } from 'express'
import alertBot from '../../jobs/alertBot'

const router = Router();

const createJobCallback = (method: Function) => async (req: Request, res: Response) => {
  try {
    await method()
    await res.status(200).end('200')
  } catch (error) {
    await res.status(400).json({ message: error })
  }
}

router.get('/perHour', createJobCallback(alertBot.perHour))
router.get('/per4Hour', createJobCallback(alertBot.per4Hour))
router.get('/perDay', createJobCallback(alertBot.perDay))
router.get('/perWeek', createJobCallback(alertBot.perWeek))
router.get('/test', async (req: Request, res: Response) => {
  console.log('here is some log.')
  await res.status(200).end('200')
})

export default router