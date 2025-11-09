import jwt from 'jsonwebtoken';
import config from '../config/index.js';

/**
 * JWT Utility Functions
 * Handles JWT token generation and verification for authentication
 */

/**
 * Generate JWT token for a user
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
export const generateToken = (user) => {
  // Create payload with user information (don't include sensitive data like password)
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name
  };

  // Sign the token with secret key and set expiration time
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export const verifyToken = (token) => {
  try {
    // Verify and decode the token
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    // Token is invalid or expired
    throw new Error('Invalid or expired token');
  }
};

/**
 * Extract token from Authorization header
 * @param {string} authHeader - Authorization header value
 * @returns {string|null} Token or null if not found
 */
export const extractToken = (authHeader) => {
  // Check if header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  // Extract token (remove "Bearer " prefix)
  return authHeader.substring(7);
};
