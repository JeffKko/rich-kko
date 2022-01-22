import mongoose from 'mongoose';

const EmailValidator = (email: string) =>
  /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(email);

export const UserInfoSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    // minlength: 6,
    // maxlength: 16,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: EmailValidator,
    },
  },
  updateAt: {
    type: Number,
    required: true,
  },
});
