import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    shippingAddress: z.string().optional(),
    signatureScentId: z.string().optional(),
    notesSaved: z.array(z.string()).optional(),
    avatar: z.string().url().optional(),
  })
});

export const deleteProfileSchema = z.object({
  body: z.object({
    confirmationText: z.literal('DELETE', {
      errorMap: () => ({ message: "Must type exactly 'DELETE' to confirm" })
    }),
  })
});
