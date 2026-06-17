import { Request, Response, NextFunction } from 'express';
import { Consultation } from './consultation.model';
import { assertOwnership } from '../../utils/ownershipCheck';

export const getMyConsultations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const consultations = await Consultation.find({ userId: req.user?._id, isDeleted: false }).sort('-date');
    res.status(200).json({ success: true, data: consultations });
  } catch (error) {
    next(error);
  }
};

export const createConsultation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const consultationData = {
      ...req.body,
      userId: req.user?._id
    };
    const consultation = await Consultation.create(consultationData);
    res.status(201).json({ success: true, data: consultation });
  } catch (error) {
    next(error);
  }
};

export const cancelConsultation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const consultation = await assertOwnership(Consultation, req.params.id as string, req.user?._id as string);
    if (consultation.isDeleted) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Consultation not found' } });
    }

    consultation.status = 'Cancelled';
    await consultation.save();

    res.status(200).json({ success: true, data: consultation });
  } catch (error) {
    next(error);
  }
};
