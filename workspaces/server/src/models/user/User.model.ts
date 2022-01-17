import mongoose from 'mongoose';
import { UserSchema } from './User.schema';

export const UserModel = mongoose.model('User', UserSchema);
