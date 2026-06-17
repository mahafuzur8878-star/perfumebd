import mongoose, { Document, Schema, Types } from 'mongoose';

interface IOrderItem {
  product: Types.ObjectId;
  productName: string;
  quantity: number;
  price: number;
  volume: string;
  image: string;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: 'Processing' | 'In Transit' | 'Delivered';
  trackingNumber?: string;
  shippingAddress: string;
  isDeleted: boolean;
}

const orderItemSchema = new Schema<IOrderItem>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  volume: { type: String, required: true },
  image: { type: String, required: true },
});

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: { type: String, enum: ['Processing', 'In Transit', 'Delivered'], default: 'Processing' },
    trackingNumber: { type: String },
    shippingAddress: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
