import mongoose from 'mongoose';

export const PchomeTopSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 26,
  },
  cateID: {
    type: String,
    required: false,
    minlength: 4,
    maxlength: 16,
  },
  name: {
    type: String,
    required: false,
  },
  originPrice: {
    type: Number,
    required: true,
  },
  picS: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
});
