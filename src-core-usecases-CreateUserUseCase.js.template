// Use Case - Create User
export class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(userData) {
    if (!userData.name || !userData.email) {
      throw new Error('Name and email are required')
    }
    
    return await this.userRepository.createUser(userData)
  }
}
