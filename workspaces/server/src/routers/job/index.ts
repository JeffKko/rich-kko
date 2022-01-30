import { Request, Response, Router } from 'express';
import alertBot from '../../jobs/alertBot';
import defaultHandler from '../defaultHandler';
import JobController from './Job.controller';

const jobController = new JobController();
const JobHanlder = defaultHandler<JobController>(jobController);

const router = Router();
const jobHandler = defaultHandler(null);

const createJobCallback =
  (method: Function) => async (req: Request, res: Response) => {
    try {
      await method();
      return {
        data: 'ok',
        status: 200,
      };
    } catch (error) {
      return {
        message: 'some error',
        status: 400,
      };
    }
  };

router.get('/perHour', jobHandler(createJobCallback(alertBot.perHour)));
router.get('/per4Hour', jobHandler(createJobCallback(alertBot.per4Hour)));
router.get('/perDay', jobHandler(createJobCallback(alertBot.perDay)));
router.get('/perWeek', jobHandler(createJobCallback(alertBot.perWeek)));
router.get(
  '/test',
  jobHandler(async () => {
    console.log('here is some log.');
    return {
      data: 'ok',
      status: 200,
    };
  }),
);

router.get('/pchomeTop', JobHanlder(jobController.getPchomeTop));
router.get('/pchomeProduct/:ID', JobHanlder(jobController.getPchomeProduct));

export default router;
