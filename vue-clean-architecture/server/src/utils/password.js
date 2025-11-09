import bcrypt from 'bcryptjs';

/**
 * Password Utility Functions
 * Handles password hashing and verification using bcrypt
 */

// Number of salt rounds for bcrypt (higher = more secure but slower)
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password) => {
  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

/**
 * Compare plain text password with hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} True if passwords match
 */
export const comparePassword = async (password, hashedPassword) => {
  try {
    // Compare the passwords using bcrypt
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePasswordStrength = (password) => {
  // Check minimum length
  if (password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long'
    };
  }

  // Add more validation rules as needed (uppercase, numbers, special chars, etc.)
  
  return {
    isValid: true,
    message: 'Password is valid'
  };
};
