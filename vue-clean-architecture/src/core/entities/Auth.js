/**
 * Auth Entity
 * Core domain entity for authentication data
 */
export class AuthUser {
  constructor(id, name, email, token = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user has a valid token
   */
  isAuthenticated() {
    return !!this.token;
  }

  /**
   * Get display name
   * @returns {string} User's display name
   */
  get displayName() {
    return this.name || this.email;
  }

  /**
   * Validate user data
   * @returns {boolean} True if user data is valid
   */
  isValid() {
    return this.id && this.email && this.name;
  }
}
