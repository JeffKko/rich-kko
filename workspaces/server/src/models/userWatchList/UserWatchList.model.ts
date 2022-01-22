import mongoose from 'mongoose';
import { UserWatchListSchema } from './UserWatchList.schema';

export interface UserWatchList extends mongoose.Document {
  userID: string;
  watchList: Map<string, any>;
}

export const UserWatchListModel = mongoose.model<UserWatchList>(
  'UserWatchList',
  UserWatchListSchema,
);
