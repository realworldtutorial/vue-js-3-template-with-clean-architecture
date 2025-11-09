import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Configuration object for the application
 * Contains all environment-based settings
 */
const config = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT configuration for authentication tokens
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  
  // CORS configuration for frontend communication
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
  }
};

export default config;
