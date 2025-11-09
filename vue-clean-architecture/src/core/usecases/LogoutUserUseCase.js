/**
 * Logout User Use Case
 * Business logic for user logout
 */
export class LogoutUserUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Execute logout use case
   * @returns {Promise<void>}
   */
  async execute() {
    return await this.authRepository.logout();
  }
}
