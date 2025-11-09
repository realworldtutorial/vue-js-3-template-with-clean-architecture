import { UserRepository } from '@/core/repositories/UserRepository'
import { User } from '@/core/entities/User'
import { UserModel } from '@/data/models/UserModel'

// Repository Implementation
export class UserRepositoryImpl extends UserRepository {
  constructor(apiDataSource) {
    super()
    this.apiDataSource = apiDataSource
  }

  async getUsers() {
    const response = await this.apiDataSource.get('/users')
    // Handle different response formats (local API returns {success, data: {users}})
    const data = response.data?.users || response.users || response
    return Array.isArray(data) ? data.map(item => {
      const model = UserModel.fromJson(item)
      return new User(model.id, model.name, model.email)
    }) : []
  }

  async getUserById(id) {
    const response = await this.apiDataSource.get(`/users/${id}`)
    // Handle different response formats
    const data = response.data?.user || response.user || response
    const model = UserModel.fromJson(data)
    return new User(model.id, model.name, model.email)
  }

  async createUser(userData) {
    const model = new UserModel(userData)
    const response = await this.apiDataSource.post('/users', model.toJson())
    // Handle different response formats
    const data = response.data?.user || response.user || response
    return new User(data.id, data.name, data.email)
  }

  async updateUser(id, userData) {
    const model = new UserModel({ id, ...userData })
    const data = await this.apiDataSource.put(`/users/${id}`, model.toJson())
    return new User(data.id, data.name, data.email)
  }

  async deleteUser(id) {
    await this.apiDataSource.delete(`/users/${id}`)
    return true
  }
}
