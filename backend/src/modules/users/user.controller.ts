import { Request, Response, NextFunction } from 'express';
import { User } from './user.model';
import { assertOwnership } from '../../utils/ownershipCheck';

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?._id);
    
    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Only allow updating certain fields
    const { name, shippingAddress, signatureScentId, notesSaved, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        ...(name && { name }),
        ...(shippingAddress && { shippingAddress }),
        ...(signatureScentId !== undefined && { signatureScentId }),
        ...(notesSaved && { notesSaved }),
        ...(avatar && { avatar }),
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'User not found' } });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { confirmationText } = req.body;
    if (confirmationText !== 'DELETE') {
       return res.status(400).json({ success: false, error: { code: 'CONFIRM_TEXT_MISMATCH', message: 'Confirmation text must be DELETE' } });
    }

    await User.findByIdAndUpdate(req.user?._id, { isDeleted: true });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
