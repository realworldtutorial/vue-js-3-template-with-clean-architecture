// Data Model - User DTO (Data Transfer Object)
export class UserModel {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.createdAt = data.createdAt || new Date().toISOString()
  }

  static fromJson(json) {
    return new UserModel({
      id: json.id,
      name: json.name,
      email: json.email,
      createdAt: json.created_at || json.createdAt
    })
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      created_at: this.createdAt
    }
  }
}
