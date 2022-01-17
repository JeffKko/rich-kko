import mongoose from 'mongoose';
import { ProductSchema } from './Product.schema';

export const ProductModel = mongoose.model('Product', ProductSchema);
