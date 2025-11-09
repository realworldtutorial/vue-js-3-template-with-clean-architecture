import { userDb } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

/**
 * Authentication Controller
 * Handles user registration, login, and authentication-related operations
 */

/**
 * Register a new user
 * POST /api/auth/register
 * @param {Object} req.body - { name, email, password }
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    if (userDb.emailExists(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password before storing
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = userDb.create({
      name,
      email,
      password: hashedPassword
    });

    // Generate JWT token
    const token = generateToken(user);

    // Send response with user data and token
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 * @param {Object} req.body - { email, password }
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = userDb.findByEmail(email);

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Send response with user data and token
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toJSON(),
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current authenticated user
 * GET /api/auth/me
 * Requires authentication middleware
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    // User is already attached to request by auth middleware
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user (client-side token removal)
 * POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    // In a stateless JWT system, logout is handled client-side by removing the token
    // This endpoint is optional and can be used for logging or cleanup
    res.json({
      success: true,
      message: 'Logout successful. Please remove the token from client storage.'
    });
  } catch (error) {
    next(error);
  }
};
