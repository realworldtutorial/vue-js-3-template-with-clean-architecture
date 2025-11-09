/**
 * User Model
 * Represents a user in the system with authentication capabilities
 * This is an in-memory data model (in production, this would connect to a database)
 */
class User {
  constructor(id, name, email, password = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // Hashed password (should never be exposed in responses)
    this.createdAt = new Date();
  }

  /**
   * Convert user object to safe JSON (without password)
   * This method is used when sending user data to the client
   * @returns {Object} User object without sensitive data
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }

  /**
   * Validate user data
   * @returns {boolean} True if user data is valid
   */
  isValid() {
    return this.id && this.email && this.name;
  }
}

/**
 * In-Memory User Database
 * In a real application, this would be replaced with a proper database (MongoDB, PostgreSQL, etc.)
 */
class UserDatabase {
  constructor() {
    // Store users in memory (will be lost on server restart)
    this.users = [];
    this.nextId = 1;
  }

  /**
   * Find all users
   * @returns {Array} Array of users (without passwords)
   */
  findAll() {
    return this.users.map(user => user.toJSON());
  }

  /**
   * Find user by ID
   * @param {number} id - User ID
   * @returns {User|null} User object or null if not found
   */
  findById(id) {
    return this.users.find(user => user.id === parseInt(id)) || null;
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {User|null} User object or null if not found
   */
  findByEmail(email) {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  }

  /**
   * Create a new user
   * @param {Object} userData - User data (name, email, password)
   * @returns {User} Created user
   */
  create(userData) {
    const user = new User(
      this.nextId++,
      userData.name,
      userData.email,
      userData.password
    );
    this.users.push(user);
    return user;
  }

  /**
   * Update user by ID
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {User|null} Updated user or null if not found
   */
  update(id, userData) {
    const user = this.findById(id);
    if (!user) return null;

    if (userData.name) user.name = userData.name;
    if (userData.email) user.email = userData.email;
    if (userData.password) user.password = userData.password;

    return user;
  }

  /**
   * Delete user by ID
   * @param {number} id - User ID
   * @returns {boolean} True if deleted, false if not found
   */
  delete(id) {
    const index = this.users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }

  /**
   * Check if email already exists
   * @param {string} email - Email to check
   * @returns {boolean} True if email exists
   */
  emailExists(email) {
    return this.findByEmail(email) !== null;
  }
}

// Export singleton instance
export const userDb = new UserDatabase();
export { User };
