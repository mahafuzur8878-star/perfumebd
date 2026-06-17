import { Request, Response, NextFunction } from 'express';
import { Order } from './order.model';
import { assertOwnership } from '../../utils/ownershipCheck';

export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find({ userId: req.user?._id, isDeleted: false }).sort('-createdAt');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await assertOwnership(Order, req.params.id as string, req.user?._id as string);
    if (order.isDeleted) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Order not found' } });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = {
      ...req.body,
      userId: req.user?._id
    };
    const order = await Order.create(orderData);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ideally this requires admin/owner role check
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!order || order.isDeleted) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Order not found' } });
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
