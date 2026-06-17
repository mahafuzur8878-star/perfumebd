import { z } from 'zod';

export const createConsultationSchema = z.object({
  body: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    time: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
    type: z.enum(['In-Person', 'Virtual']),
    expertName: z.string().min(1, 'Expert name is required'),
    notes: z.string().optional(),
  })
});

export const updateConsultationStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Scheduled', 'Completed', 'Cancelled']),
  })
});
