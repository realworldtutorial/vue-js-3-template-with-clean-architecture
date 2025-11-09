/**
 * Register User Use Case
 * Business logic for user registration
 */
export class RegisterUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Execute registration use case
   * @param {Object} userData - User registration data { name, email, password }
   * @returns {Promise<AuthUser>} Registered user with authentication token
   */
  async execute(userData) {
    // Validate input data
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Name, email and password are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    // Validate password length
    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Delegate to repository
    return await this.authRepository.register(userData);
  }
}
