import mongoose from 'mongoose';
import { ProductSchema } from './Product.schema';

export interface PchomeProduct {
  ID: string;
  cateID: string;
  name: string;
  describe?: string;
  originPrice: number;
  price?: number;
  picB?: string;
  picS?: string;
  qty?: number;
  isArrival24h?: 0 | 1;
  lastUpdate?: number;
}

export interface Product extends mongoose.Document, PchomeProduct {}

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
