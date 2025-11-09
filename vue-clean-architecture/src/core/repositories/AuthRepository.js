/**
 * Auth Repository Interface
 * Defines the contract for authentication operations
 * This is implemented by the data layer
 */
export class AuthRepository {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<AuthUser>} Registered user with token
   */
  async register(userData) {
    throw new Error('register() must be implemented');
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<AuthUser>} Authenticated user with token
   */
  async login(email, password) {
    throw new Error('login() must be implemented');
  }

  /**
   * Get current authenticated user
   * @returns {Promise<AuthUser>} Current user
   */
  async getCurrentUser() {
    throw new Error('getCurrentUser() must be implemented');
  }

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  async logout() {
    throw new Error('logout() must be implemented');
  }
}
