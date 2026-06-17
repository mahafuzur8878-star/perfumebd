import { z } from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      product: z.string().min(1, 'Product ID is required'),
      productName: z.string().min(1, 'Product Name is required'),
      quantity: z.number().int().min(1, 'Quantity must be at least 1'),
      price: z.number().positive('Price must be positive'),
      volume: z.string().min(1, 'Volume is required'),
      image: z.string().url('Valid image URL required')
    })).min(1, 'Order must contain at least one item'),
    total: z.number().positive('Total must be positive'),
    shippingAddress: z.string().min(1, 'Shipping address is required'),
  })
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Processing', 'In Transit', 'Delivered']),
    trackingNumber: z.string().optional(),
  })
});
