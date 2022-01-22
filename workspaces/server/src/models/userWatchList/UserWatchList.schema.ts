import mongoose from 'mongoose';

export const UserWatchListSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  watchList: {
    type: Map,
    required: true,
  },
});
