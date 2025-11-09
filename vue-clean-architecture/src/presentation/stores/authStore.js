import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { RegisterUserUseCase } from '@/core/usecases/RegisterUserUseCase';
import { LoginUserUseCase } from '@/core/usecases/LoginUserUseCase';
import { GetCurrentUserUseCase } from '@/core/usecases/GetCurrentUserUseCase';
import { LogoutUserUseCase } from '@/core/usecases/LogoutUserUseCase';
import { AuthRepositoryImpl } from '@/data/repositories/AuthRepositoryImpl';
import { ApiDataSource } from '@/data/datasources/ApiDataSource';

/**
 * Authentication Store
 * Manages authentication state and operations using Pinia
 * Follows clean architecture principles with dependency injection
 */

// Dependency Injection: Create instances of data sources, repositories, and use cases
const apiDataSource = new ApiDataSource();
const authRepository = new AuthRepositoryImpl(apiDataSource);
const registerUserUseCase = new RegisterUserUseCase(authRepository);
const loginUserUseCase = new LoginUserUseCase(authRepository);
const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);
const logoutUserUseCase = new LogoutUserUseCase(authRepository);

export const useAuthStore = defineStore('auth', () => {
  /**
   * STATE
   */
  const user = ref(null);           // Current authenticated user
  const loading = ref(false);       // Loading state for async operations
  const error = ref(null);          // Error message

  /**
   * GETTERS (Computed Properties)
   */
  
  // Check if user is authenticated
  const isAuthenticated = computed(() => !!user.value);
  
  // Get user's display name
  const userName = computed(() => user.value?.name || 'Guest');
  
  // Get user's email
  const userEmail = computed(() => user.value?.email || '');

  /**
   * ACTIONS
   */

  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   */
  async function register(userData) {
    loading.value = true;
    error.value = null;
    
    try {
      // Execute registration use case
      const authUser = await registerUserUseCase.execute(userData);
      
      // Set current user
      user.value = {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        token: authUser.token
      };

      return authUser;
    } catch (err) {
      // Set error message
      error.value = err.message;
      console.error('Registration error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   */
  async function login(email, password) {
    loading.value = true;
    error.value = null;
    
    try {
      // Execute login use case
      const authUser = await loginUserUseCase.execute(email, password);
      
      // Set current user
      user.value = {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        token: authUser.token
      };

      return authUser;
    } catch (err) {
      // Set error message
      error.value = err.message;
      console.error('Login error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Logout current user
   */
  async function logout() {
    loading.value = true;
    error.value = null;
    
    try {
      // Execute logout use case
      await logoutUserUseCase.execute();
      
      // Clear current user
      user.value = null;
    } catch (err) {
      error.value = err.message;
      console.error('Logout error:', err);
    } finally {
      loading.value = false;
    }
  }

  /**
   * Check and restore authentication from stored token
   * Call this on app initialization
   */
  async function checkAuth() {
    loading.value = true;
    error.value = null;
    
    try {
      // Try to get current user from stored token
      const authUser = await getCurrentUserUseCase.execute();
      
      // Set current user
      user.value = {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
        token: authUser.token
      };

      return true;
    } catch (err) {
      // Token is invalid or expired, clear user
      user.value = null;
      return false;
    } finally {
      loading.value = false;
    }
  }

  /**
   * Clear error message
   */
  function clearError() {
    error.value = null;
  }

  // Return store state and actions
  return {
    // State
    user,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    userName,
    userEmail,
    
    // Actions
    register,
    login,
    logout,
    checkAuth,
    clearError
  };
});
