import { validationResult } from 'express-validator';

/**
 * Validation Middleware
 * Checks for validation errors from express-validator
 * Returns 400 error if validation fails
 */
export const validate = (req, res, next) => {
  // Get validation errors from request
  const errors = validationResult(req);

  // Check if there are any validation errors
  if (!errors.isEmpty()) {
    // Return first error message
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }

  // No errors, continue to next middleware/route handler
  next();
};
