import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    concentration: z.string().min(1, 'Concentration is required'),
    price: z.number().positive('Price must be positive'),
    description: z.string().min(1, 'Description is required'),
    volume: z.string().min(1, 'Volume is required'),
    image: z.string().url('Must be a valid URL'),
  })
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    concentration: z.string().optional(),
    price: z.number().positive().optional(),
    description: z.string().optional(),
    volume: z.string().optional(),
    image: z.string().url().optional(),
  })
});
