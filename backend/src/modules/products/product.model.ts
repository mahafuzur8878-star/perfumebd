import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  concentration: string;
  price: number;
  description: string;
  volume: string;
  image: string;
  isDeleted: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    concentration: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    volume: { type: String, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
