import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { validate } from '../../middleware/validate';
import {
  getMyConsultations,
  createConsultation,
  cancelConsultation
} from './consultation.controller';
import { createConsultationSchema } from './consultation.schema';

const router = Router();

router.use(requireAuth);

router.get('/', getMyConsultations);
router.post('/', validate(createConsultationSchema), createConsultation);
router.patch('/:id/cancel', cancelConsultation);

export default router;
