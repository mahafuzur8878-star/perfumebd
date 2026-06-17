import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { validate } from '../../middleware/validate';
import { getMe, updateMe, deleteMe } from './user.controller';
import { updateProfileSchema, deleteProfileSchema } from './user.schema';

const router = Router();

// All user routes require authentication
router.use(requireAuth);

router.get('/me', getMe);
router.patch('/me', validate(updateProfileSchema), updateMe);
router.delete('/me', validate(deleteProfileSchema), deleteMe);

export default router;
