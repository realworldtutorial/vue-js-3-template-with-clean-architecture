import { userDb } from '../models/User.js';
import { hashPassword } from '../utils/password.js';

/**
 * User Controller
 * Handles CRUD operations for users
 */

/**
 * Get all users
 * GET /api/users
 */
export const getAllUsers = async (req, res, next) => {
  try {
    // Retrieve all users from database (passwords are excluded in toJSON())
    const users = userDb.findAll();

    res.json({
      success: true,
      data: {
        users,
        count: users.length
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 * GET /api/users/:id
 */
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = userDb.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        user: user.toJSON()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new user
 * POST /api/users
 */
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    if (userDb.emailExists(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Hash password if provided, otherwise set default
    const hashedPassword = password ? await hashPassword(password) : await hashPassword('defaultPassword123');

    // Create new user
    const user = userDb.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: user.toJSON()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user
 * PUT /api/users/:id
 */
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Find user
    const existingUser = userDb.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== existingUser.email && userDb.emailExists(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Prepare update data
    const updateData = { name, email };

    // Hash new password if provided
    if (password) {
      updateData.password = await hashPassword(password);
    }

    // Update user
    const updatedUser = userDb.update(id, updateData);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        user: updatedUser.toJSON()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * DELETE /api/users/:id
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete user
    const deleted = userDb.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
