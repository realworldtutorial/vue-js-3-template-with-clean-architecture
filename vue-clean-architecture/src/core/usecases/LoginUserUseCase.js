/**
 * Login User Use Case
 * Business logic for user authentication
 */
export class LoginUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Execute login use case
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<AuthUser>} Authenticated user with token
   */
  async execute(email, password) {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Delegate to repository
    return await this.authRepository.login(email, password);
  }
}
