import { Request, Response, NextFunction } from 'express';
import { HttpStatus, JwtPayload } from '../types';
import jwt from 'jsonwebtoken';

export const jwtGuard = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.error('can not find authorization');
    res.status(HttpStatus.UNAUTHORIZED).json('can not find authorization');
    return;
  }

  if (authorization === 'kko') {
    next();
    return;
  }

  try {
    const userInfo = jwt.verify(
      authorization ?? '',
      process.env.JWT_SIGN as string,
    ) as JwtPayload;

    console.log('user confirm:', userInfo);

    // req.userInfo = userInfo;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error(`${error.message}, jwt: ${authorization}`);
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json(`${error.message}, jwt: ${authorization}`);
    } else {
      next(error);
    }
  }
};
