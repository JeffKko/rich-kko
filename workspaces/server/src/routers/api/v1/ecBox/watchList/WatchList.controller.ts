import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../../../../../bases/Controller.base';
import { HttpStatus } from '@/types';
import { UserWatchListModel } from '../../../../../models/userWatchList/UserWatchList.model';

export default class WatchListController extends ControllerBase {
  public async getWatchList(req: Request, res: Response, next: NextFunction) {
    const { userID } = req.params;
    const document = await UserWatchListModel.findOne({ userID });

    return this.formatResponse(
      [...(document?.watchList.keys() ?? [])],
      HttpStatus.OK,
    );
  }

  public async addProductIntoWatchList(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { userID, ID } = req.params;

    const document = await UserWatchListModel.findOne({ userID });

    if (document) {
      const options = {
        new: true,
        runValidators: true,
      };

      document.watchList.set(ID, {});

      await UserWatchListModel.findOneAndUpdate(
        { userID },
        { watchList: document.watchList },
        options,
      );

      return this.formatResponse([...document.watchList.keys()], HttpStatus.OK);
    } else {
      const payload = {
        userID,
        watchList: new Map([[ID, {}]]),
      };

      const newWatchList = new UserWatchListModel(payload);
      await newWatchList.save();

      return this.formatResponse([ID], HttpStatus.OK);
    }
  }

  public async deleteProductFromWatchList(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { userID, ID } = req.params;

    const document = await UserWatchListModel.findOne({ userID });

    const watchList = document?.watchList ?? new Map();

    if (!watchList.has(ID)) {
      return this.formatResponse(
        `can't find ${ID} in watchList`,
        HttpStatus.BAD_REQUEST,
      );
    }

    watchList.delete(ID);

    const options = {
      new: true,
      runValidators: true,
    };

    await UserWatchListModel.findOneAndUpdate(
      { userID },
      { watchList },
      options,
    );

    return this.formatResponse([...watchList.keys()], HttpStatus.OK);
  }
}
