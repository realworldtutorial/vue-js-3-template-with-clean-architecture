<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Create Account</h2>
      
      <!-- Display error message if any -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <!-- Registration Form -->
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            placeholder="Enter your full name"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="Enter your email"
            required
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="Enter your password (min 6 characters)"
            required
            minlength="6"
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            :disabled="loading"
          />
        </div>

        <!-- Password mismatch warning -->
        <div v-if="passwordMismatch" class="warning-message">
          Passwords do not match
        </div>

        <button 
          type="submit" 
          class="btn-primary" 
          :disabled="loading || passwordMismatch"
        >
          {{ loading ? 'Creating Account...' : 'Register' }}
        </button>
      </form>

      <!-- Link to login -->
      <p class="switch-form">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/presentation/stores/authStore';

/**
 * Register View Component
 * Handles new user registration
 */

// Router for navigation
const router = useRouter();

// Auth store for authentication operations
const authStore = useAuthStore();

// Form data (reactive state)
const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// Get loading and error states from store
const loading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

// Check if passwords match
const passwordMismatch = computed(() => {
  // Only show mismatch if user has typed in confirm password field
  if (!formData.value.confirmPassword) return false;
  return formData.value.password !== formData.value.confirmPassword;
});

/**
 * Handle registration form submission
 * Validates input and calls the register action from auth store
 */
const handleRegister = async () => {
  // Check if passwords match
  if (passwordMismatch.value) {
    return;
  }

  try {
    // Clear any previous errors
    authStore.clearError();

    // Attempt to register
    await authStore.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    });

    // Navigate to home page on successful registration
    router.push('/');
  } catch (err) {
    // Error is already set in the store
    console.error('Registration failed:', err.message);
  }
};
</script>

<style scoped>
/* Container for centering the register card */
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

/* Register card styling */
.register-card {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* Heading */
.register-card h2 {
  margin: 0 0 30px 0;
  text-align: center;
  color: #2c3e50;
}

/* Error message styling */
.error-message {
  background-color: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}

/* Warning message styling */
.warning-message {
  background-color: #fff3cd;
  color: #856404;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}

/* Form group (label + input) */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* Primary button */
.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #3aa876;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Switch form link */
.switch-form {
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.switch-form a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.switch-form a:hover {
  text-decoration: underline;
}
</style>
