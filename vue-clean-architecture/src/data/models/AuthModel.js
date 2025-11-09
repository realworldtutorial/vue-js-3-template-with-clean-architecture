/**
 * Auth Model
 * Data transfer object for authentication data
 */
export class AuthModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.token = data.token;
    this.createdAt = data.createdAt;
  }

  /**
   * Convert model to domain entity
   * @returns {AuthUser} Domain entity
   */
  toEntity() {
    const { AuthUser } = require('@/core/entities/Auth');
    return new AuthUser(this.id, this.name, this.email, this.token);
  }

  /**
   * Create model from API response
   * @param {Object} response - API response data
   * @returns {AuthModel} Auth model instance
   */
  static fromResponse(response) {
    return new AuthModel({
      id: response.id,
      name: response.name,
      email: response.email,
      token: response.token || null,
      createdAt: response.createdAt
    });
  }
}
