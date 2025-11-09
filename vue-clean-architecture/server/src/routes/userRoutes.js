import express from 'express';
import { body } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

/**
 * User Routes
 * These routes handle CRUD operations for users
 */

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get('/:id', getUserById);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 */
router.post(
  '/',
  [
    // Validation rules for creating user
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail()
  ],
  validate,   // Validate request
  createUser  // Handle user creation
);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Private (requires authentication)
 */
router.put(
  '/:id',
  authenticate, // Require authentication
  [
    // Validation rules for updating user
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),
    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email')
      .normalizeEmail(),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  validate,   // Validate request
  updateUser  // Handle user update
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private (requires authentication)
 */
router.delete('/:id', authenticate, deleteUser);

export default router;
