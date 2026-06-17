import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../users/user.model';
import { signAccess, signRefresh, verifyRefresh } from '../../utils/jwt';
import { env } from '../../config/env';

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        error: { code: 'CONFLICT', message: 'User already exists' }
      });
    }

    const user = await User.create({ name, email, password });

    const accessToken = signAccess(user._id);
    const refreshToken = signRefresh(user._id);

    // Hash refresh token to store in DB
    const salt = await bcrypt.genSalt(10);
    user.refreshToken = await bcrypt.hash(refreshToken, salt);
    await user.save();

    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isDeleted: false }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' }
      });
    }

    const accessToken = signAccess(user._id);
    const refreshToken = signRefresh(user._id);

    const salt = await bcrypt.genSalt(10);
    user.refreshToken = await bcrypt.hash(refreshToken, salt);
    await user.save();

    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken
      }
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // We assume cookie-parser is used or we can parse manually.
    // Let's add cookie-parser to requirements or parse from req.headers.cookie
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
       return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'No refresh token' } });
    }

    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    const token = cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'No refresh token' } });
    }

    try {
      const decoded = verifyRefresh(token);
      const user = await User.findById(decoded.id).select('+refreshToken');
      
      if (!user || !user.refreshToken) {
        return res.status(401).json({ success: false, error: { code: 'REFRESH_TOKEN_INVALID', message: 'Invalid refresh token' } });
      }

      // Check if the provided token matches the hashed token in DB
      const isValid = await bcrypt.compare(token, user.refreshToken);
      if (!isValid) {
        // Breach detection: If an invalid valid token is used, someone might have stolen an old one
        // So we clear the DB refresh token to revoke all access
        user.refreshToken = undefined;
        await user.save();
        return res.status(401).json({ success: false, error: { code: 'REFRESH_TOKEN_INVALID', message: 'Token reuse detected' } });
      }

      // Rotate token
      const newAccessToken = signAccess(user._id);
      const newRefreshToken = signRefresh(user._id);

      const salt = await bcrypt.genSalt(10);
      user.refreshToken = await bcrypt.hash(newRefreshToken, salt);
      await user.save();

      res.cookie('refreshToken', newRefreshToken, cookieOptions);

      res.status(200).json({
        success: true,
        data: { accessToken: newAccessToken }
      });

    } catch (err) {
      return res.status(401).json({ success: false, error: { code: 'REFRESH_TOKEN_INVALID', message: 'Refresh token expired or invalid' } });
    }
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
    }
    
    res.clearCookie('refreshToken', { ...cookieOptions, maxAge: 0 });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
