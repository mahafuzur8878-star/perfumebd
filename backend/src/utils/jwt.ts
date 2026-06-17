import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Types } from 'mongoose';

export const signAccess = (userId: string | Types.ObjectId): string => {
  return jwt.sign({ id: userId.toString() }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

export const signRefresh = (userId: string | Types.ObjectId): string => {
  return jwt.sign({ id: userId.toString() }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
};

export const verifyAccess = (token: string): any => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

export const verifyRefresh = (token: string): any => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};
