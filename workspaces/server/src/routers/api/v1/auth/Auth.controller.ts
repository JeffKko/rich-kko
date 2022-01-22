import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../../../../bases/Controller.base';
import { HttpStatus, GoogleUserInfo, JwtPayload } from '@/types';
import axios from 'axios';
import JWT from 'jsonwebtoken';
import { UserInfoModel } from '../../../../models/userInfo/UserInfo.model';

export default class AuthController extends ControllerBase {
  public async google(req: Request, res: Response, next: NextFunction) {
    const { accessToken, expiresIn, issuedAt } = req.body;

    if (!accessToken) {
      return this.formatResponse('lost accessToken', HttpStatus.UNAUTHORIZED);
    }

    const { data } = await axios.get<GoogleUserInfo>(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
    );

    const userInfo = {
      ID: data.sub,
      name: data.name,
      email: data.email,
    };

    const documents = await UserInfoModel.find({ ID: userInfo.ID });

    if (documents.length) {
      await UserInfoModel.updateOne(
        { ID: userInfo.ID },
        { updateAt: new Date().getTime() },
        { runValidators: true },
      );
    } else {
      const newUser = new UserInfoModel({
        ...userInfo,
        updateAt: new Date().getTime(),
      });
      await newUser.save();
    }

    // TODO: shoud use expiresIn from body?
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    const payload: JwtPayload = {
      ...userInfo,
      accessToken,
      exp: expiry.getTime() / 1000,
    };

    const jwt = JWT.sign(payload, process.env.JWT_SIGN as string);

    return this.formatResponse(
      {
        jwt,
        ID: payload.ID,
        name: payload.name,
        email: payload.email,
        exp: payload.exp,
      },
      HttpStatus.OK,
    );
  }
}
