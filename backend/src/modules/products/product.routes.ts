import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { validate } from '../../middleware/validate';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from './product.controller';
import { createProductSchema, updateProductSchema } from './product.schema';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin / Owner only routes (Requires roleGuard which could be added later, for now just requireAuth)
router.use(requireAuth);
router.post('/', validate(createProductSchema), createProduct);
router.patch('/:id', validate(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
