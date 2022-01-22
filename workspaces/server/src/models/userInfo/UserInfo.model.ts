import mongoose from 'mongoose';
import { UserInfoSchema } from './UserInfo.schema';

export const UserInfoModel = mongoose.model('UserInfo', UserInfoSchema);
