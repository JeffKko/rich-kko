import { Router } from 'express';
import WatchListController from './WatchList.controller';
import defaultHandler from '../../../../../routers/defaultHandler';
import { jwtGuard } from '../../../../../lib/JwtGuard';

const wathListController = new WatchListController();
const wathListHandler = defaultHandler<WatchListController>(wathListController);
const router = Router();

router.get(
  '/user/:userID/watchList',
  jwtGuard,
  wathListHandler(wathListController.getWatchList),
);

router.post(
  '/user/:userID/watchList/:ID',
  jwtGuard,
  wathListHandler(wathListController.addProductIntoWatchList),
);

router.delete(
  '/user/:userID/watchList/:ID',
  jwtGuard,
  wathListHandler(wathListController.deleteProductFromWatchList),
);

export default router;
