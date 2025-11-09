/**
 * Error Handling Middleware
 * Catches all errors and sends a consistent error response
 * This should be the last middleware in the chain
 */
export const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', err);

  // Determine status code (default to 500 Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    // Include stack trace in development mode only
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * 404 Not Found Middleware
 * Handles requests to non-existent routes
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
