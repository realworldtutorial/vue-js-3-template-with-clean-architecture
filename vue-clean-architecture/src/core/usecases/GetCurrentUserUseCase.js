/**
 * Get Current User Use Case
 * Business logic for retrieving current authenticated user
 */
export class GetCurrentUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Execute get current user use case
   * @returns {Promise<AuthUser>} Current authenticated user
   */
  async execute() {
    return await this.authRepository.getCurrentUser();
  }
}
