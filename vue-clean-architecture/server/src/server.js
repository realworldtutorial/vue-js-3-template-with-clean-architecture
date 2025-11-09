import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

/**
 * Express Application Setup
 * Main server file that configures and starts the Express.js application
 */

// Initialize Express app
const app = express();

/**
 * MIDDLEWARE CONFIGURATION
 */

// Enable CORS for cross-origin requests from Vue frontend
app.use(cors(config.cors));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development)
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
      body: req.body,
      params: req.params,
      query: req.query
    });
    next();
  });
}

/**
 * ROUTES CONFIGURATION
 */

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/users', userRoutes); // User management routes

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Vue Clean Architecture API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users'
    }
  });
});

/**
 * ERROR HANDLING MIDDLEWARE
 * These must be registered after all routes
 */

// Handle 404 errors for undefined routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

/**
 * START SERVER
 */
const PORT = config.port;

app.listen(PORT, () => {
  console.log('=================================');
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`CORS enabled for: ${config.cors.origin}`);
  console.log('=================================');
  console.log('Available endpoints:');
  console.log(`  GET  http://localhost:${PORT}/`);
  console.log(`  GET  http://localhost:${PORT}/health`);
  console.log(`  POST http://localhost:${PORT}/api/auth/register`);
  console.log(`  POST http://localhost:${PORT}/api/auth/login`);
  console.log(`  GET  http://localhost:${PORT}/api/auth/me`);
  console.log(`  GET  http://localhost:${PORT}/api/users`);
  console.log('=================================');
});

export default app;
