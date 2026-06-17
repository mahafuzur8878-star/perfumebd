import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IConsultation extends Document {
  userId: Types.ObjectId;
  date: string; // ISO format YYYY-MM-DD
  time: string; // HH:MM format
  type: 'In-Person' | 'Virtual';
  expertName: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
  isDeleted: boolean;
}

const consultationSchema = new Schema<IConsultation>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, enum: ['In-Person', 'Virtual'], required: true },
    expertName: { type: String, required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    notes: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Consultation = mongoose.model<IConsultation>('Consultation', consultationSchema);
