import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { validate } from '../../middleware/validate';
import {
  getMyOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} from './order.controller';
import { createOrderSchema, updateOrderStatusSchema } from './order.schema';

const router = Router();

router.use(requireAuth);

router.get('/', getMyOrders);
router.post('/', validate(createOrderSchema), createOrder);
router.get('/:id', getOrderById);

// Admin / Owner only
router.patch('/:id/status', validate(updateOrderStatusSchema), updateOrderStatus);

export default router;
