<template>
  <div class="home-container">
    <div class="hero">
      <h1>Welcome to Vue Clean Architecture</h1>
      <p class="subtitle">
        This project demonstrates the implementation of Clean Architecture principles 
        with Vue.js 3, Express.js API, and JWT Authentication
      </p>

      <!-- Authentication Status -->
      <div v-if="isAuthenticated" class="welcome-message">
        <h2>👋 Welcome back, {{ userName }}!</h2>
        <p>You are successfully logged in.</p>
      </div>
      <div v-else class="auth-prompt">
        <p>Please log in or register to access all features</p>
        <div class="auth-buttons">
          <router-link to="/login" class="btn btn-primary">Login</router-link>
          <router-link to="/register" class="btn btn-outline">Register</router-link>
        </div>
      </div>
      
      <div class="features">
        <div class="feature-card">
          <h3>🏗️ Clean Architecture</h3>
          <p>Separation of concerns with Domain, Data, and Presentation layers</p>
        </div>
        
        <div class="feature-card">
          <h3>🔐 Authentication</h3>
          <p>JWT-based authentication with registration and login</p>
        </div>
        
        <div class="feature-card">
          <h3>📦 Pinia State Management</h3>
          <p>Modern state management for Vue 3 with composition API</p>
        </div>
        
        <div class="feature-card">
          <h3>🚀 Express.js API</h3>
          <p>RESTful API server with user management endpoints</p>
        </div>
      </div>

      <div class="cta">
        <router-link to="/users" class="btn btn-large">View Users Example</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/presentation/stores/authStore'

/**
 * Home View Component
 * Landing page that displays welcome message and authentication status
 */

// Get auth store
const authStore = useAuthStore()

// Computed properties for authentication status
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.userName)
</script>

<style scoped>
/* Home container */
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

/* Hero section */
.hero {
  text-align: center;
  padding: 2rem 0;
}

.hero h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Welcome message for authenticated users */
.welcome-message {
  background: linear-gradient(135deg, #42b983 0%, #35a372 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
  box-shadow: 0 4px 15px rgba(66, 185, 131, 0.3);
}

.welcome-message h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.welcome-message p {
  margin: 0;
  font-size: 1.1rem;
}

/* Auth prompt for guest users */
.auth-prompt {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
  border: 2px dashed #dee2e6;
}

.auth-prompt p {
  margin: 0 0 1.5rem 0;
  font-size: 1.1rem;
  color: #666;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.btn-outline {
  background-color: transparent;
  color: #42b983;
  border: 2px solid #42b983;
}

.btn-outline:hover {
  background-color: #42b983;
  color: white;
  transform: translateY(-2px);
}

.btn-large {
  padding: 1rem 3rem;
  font-size: 1.1rem;
}

/* Features grid */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  margin: 0 0 0.75rem 0;
  color: #2c3e50;
  font-size: 1.3rem;
}

.feature-card p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

/* Call to action section */
.cta {
  margin-top: 3rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .welcome-message h2 {
    font-size: 1.5rem;
  }

  .features {
    grid-template-columns: 1fr;
  }
}
</style>
