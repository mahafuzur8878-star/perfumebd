import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Start listening
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: any) => {
    console.error('❌ Unhandled Rejection:', err);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
};

startServer();
