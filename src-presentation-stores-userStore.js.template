import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { GetUsersUseCase } from '@/core/usecases/GetUsersUseCase'
import { CreateUserUseCase } from '@/core/usecases/CreateUserUseCase'
import { UserRepositoryImpl } from '@/data/repositories/UserRepositoryImpl'
import { ApiDataSource } from '@/data/datasources/ApiDataSource'

// Dependency Injection
const apiDataSource = new ApiDataSource()
const userRepository = new UserRepositoryImpl(apiDataSource)
const getUsersUseCase = new GetUsersUseCase(userRepository)
const createUserUseCase = new CreateUserUseCase(userRepository)

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const userCount = computed(() => users.value.length)
  const hasUsers = computed(() => users.value.length > 0)

  // Actions
  async function fetchUsers() {
    loading.value = true
    error.value = null
    try {
      users.value = await getUsersUseCase.execute()
    } catch (err) {
      error.value = err.message
      console.error('Error fetching users:', err)
    } finally {
      loading.value = false
    }
  }

  async function addUser(userData) {
    loading.value = true
    error.value = null
    try {
      const newUser = await createUserUseCase.execute(userData)
      users.value.push(newUser)
      return newUser
    } catch (err) {
      error.value = err.message
      console.error('Error creating user:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    users,
    loading,
    error,
    userCount,
    hasUsers,
    fetchUsers,
    addUser,
    clearError
  }
})
