import mongoose from 'mongoose';
import { PchomeTopSchema } from './PchomeTop.schema';

export const PchomeTopModel = mongoose.model('PchomeTop', PchomeTopSchema);
