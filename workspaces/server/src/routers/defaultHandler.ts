import { Request, Response, NextFunction } from 'express';
import { IFormatResponse } from '../types';

export default function defaultHandler<T>(context: T) {
  return (
    method: (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => Promise<IFormatResponse>,
  ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await method.call(context, req, res, next);
        res.status(result.status).json(result.data ?? result.message);
      } catch (error) {
        console.error(error);
        next(error);
      }
    };
  };
}
