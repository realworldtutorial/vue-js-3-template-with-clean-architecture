import { verifyToken, extractToken } from '../utils/jwt.js';
import { userDb } from '../models/User.js';

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request object
 * This middleware protects routes that require authentication
 */
export const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = extractToken(req.headers.authorization);

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Find user in database
    const user = userDb.findById(decoded.id);

    // Check if user still exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Token is invalid.'
      });
    }

    // Attach user to request object (without password)
    req.user = user.toJSON();

    // Continue to next middleware/route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
      error: error.message
    });
  }
};

/**
 * Optional Authentication Middleware
 * Attaches user to request if token is valid, but doesn't block if token is missing/invalid
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req.headers.authorization);

    if (token) {
      const decoded = verifyToken(token);
      const user = userDb.findById(decoded.id);

      if (user) {
        req.user = user.toJSON();
      }
    }
  } catch (error) {
    // Silently fail - user is optional
    console.log('Optional auth failed:', error.message);
  }

  next();
};
