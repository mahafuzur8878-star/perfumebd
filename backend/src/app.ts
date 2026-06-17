import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';

// Routes
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import productRoutes from './modules/products/product.routes';
import orderRoutes from './modules/orders/order.routes';
import consultationRoutes from './modules/consultations/consultation.routes';

const app = express();

// 1. Security headers
app.use(helmet());

// 2. CORS
const corsOrigins = env.CORS_ORIGINS ? env.CORS_ORIGINS.split(',') : ['http://localhost:5173'];
app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));

// 3. Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// 4. NoSQL injection prevention
app.use(mongoSanitize());

// 5. Logging
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health and Readiness
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

import mongoose from 'mongoose';
app.get('/ready', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.status(200).send('Ready');
  } else {
    res.status(503).send('Service Unavailable');
  }
});

// 6. Global rate limit
const globalLimiter = rateLimit({ 
  windowMs: 60 * 1000, // 1 minute
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false 
});
app.use('/api', globalLimiter);

// 7. Strict auth-route rate limit
const authLimiter = rateLimit({ 
  windowMs: 60 * 1000, // 1 minute
  max: 10, 
  skipSuccessfulRequests: true 
});
app.use('/api/v1/auth', authLimiter);

// 8. Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/consultations', consultationRoutes);

// 9. Central error handler
app.use(errorHandler);

export default app;
