import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../../../../bases/Controller.base';
import { HttpStatus, GoogleUserInfo, JwtPayload } from '@/types';
import axios from 'axios';
import JWT from 'jsonwebtoken';

export default class AuthController extends ControllerBase {
  public async google(req: Request, res: Response, next: NextFunction) {
    const { accessToken, expiresIn, issuedAt } = req.body;

    if (!accessToken) {
      return this.formatResponse('lost accessToken', HttpStatus.UNAUTHORIZED);
    }

    const { data } = await axios.get<GoogleUserInfo>(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
    );

    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    const payload: JwtPayload = {
      accessToken,
      id: data.sub,
      name: data.name,
      email: data.email,
      exp: expiry.getTime() / 1000,
    };

    const jwt = JWT.sign(payload, process.env.JWT_SIGN as string);

    return this.formatResponse(jwt, HttpStatus.OK);
  }
}
