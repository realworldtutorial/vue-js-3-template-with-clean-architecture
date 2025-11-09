import { AuthRepository } from '@/core/repositories/AuthRepository';
import { AuthUser } from '@/core/entities/Auth';

/**
 * Auth Repository Implementation
 * Implements authentication operations using the API data source
 */
export class AuthRepositoryImpl extends AuthRepository {
  constructor(apiDataSource) {
    super();
    this.apiDataSource = apiDataSource;
    this.tokenKey = 'auth_token'; // Local storage key for JWT token
  }

  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise<AuthUser>} Registered user with token
   */
  async register(userData) {
    try {
      // Call registration API endpoint
      const response = await this.apiDataSource.post('/auth/register', userData);

      // Check if registration was successful
      if (!response.success) {
        throw new Error(response.message || 'Registration failed');
      }

      // Extract user and token from response
      const { user, token } = response.data;

      // Store token in local storage for future requests
      this.saveToken(token);

      // Set authorization header for future requests
      this.apiDataSource.setAuthToken(token);

      // Return AuthUser entity
      return new AuthUser(user.id, user.name, user.email, token);
    } catch (error) {
      // Handle API errors
      throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<AuthUser>} Authenticated user with token
   */
  async login(email, password) {
    try {
      // Call login API endpoint
      const response = await this.apiDataSource.post('/auth/login', { email, password });

      // Check if login was successful
      if (!response.success) {
        throw new Error(response.message || 'Login failed');
      }

      // Extract user and token from response
      const { user, token } = response.data;

      // Store token in local storage
      this.saveToken(token);

      // Set authorization header for future requests
      this.apiDataSource.setAuthToken(token);

      // Return AuthUser entity
      return new AuthUser(user.id, user.name, user.email, token);
    } catch (error) {
      // Handle API errors
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  }

  /**
   * Get current authenticated user
   * @returns {Promise<AuthUser>} Current user
   */
  async getCurrentUser() {
    try {
      // Get token from local storage
      const token = this.getToken();

      if (!token) {
        throw new Error('No authentication token found');
      }

      // Set authorization header
      this.apiDataSource.setAuthToken(token);

      // Call get current user API endpoint
      const response = await this.apiDataSource.get('/auth/me');

      // Check if request was successful
      if (!response.success) {
        throw new Error(response.message || 'Failed to get current user');
      }

      // Extract user from response
      const { user } = response.data;

      // Return AuthUser entity
      return new AuthUser(user.id, user.name, user.email, token);
    } catch (error) {
      // Clear invalid token
      this.removeToken();
      throw new Error(error.response?.data?.message || error.message || 'Authentication failed');
    }
  }

  /**
   * Logout user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      // Call logout API endpoint (optional)
      await this.apiDataSource.post('/auth/logout', {});
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error.message);
    } finally {
      // Remove token from local storage
      this.removeToken();

      // Clear authorization header
      this.apiDataSource.clearAuthToken();
    }
  }

  /**
   * Save token to local storage
   * @param {string} token - JWT token
   */
  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Get token from local storage
   * @returns {string|null} JWT token or null
   */
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Remove token from local storage
   */
  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated() {
    return !!this.getToken();
  }
}
