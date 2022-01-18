import mongoose from 'mongoose';
import { PchomeTopSchema } from './PchomeTop.schema';

export interface PchomeTop extends mongoose.Document {
  ID: string;
  cateID?: string;
  name: string;
  originPrice: number;
  picS?: string;
  price?: number;
  lastUpdate?: number;
}

export const PchomeTopModel = mongoose.model<PchomeTop>(
  'PchomeTop',
  PchomeTopSchema,
);
