<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Brand/Logo -->
      <div class="navbar-brand">
        <router-link to="/">Vue Clean Architecture</router-link>
      </div>

      <!-- Navigation Links -->
      <div class="navbar-menu">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/users" class="nav-link">Users</router-link>
        
        <!-- Show different links based on authentication status -->
        <template v-if="isAuthenticated">
          <!-- Authenticated user menu -->
          <span class="user-info">{{ userName }}</span>
          <button @click="handleLogout" class="btn-logout">Logout</button>
        </template>
        <template v-else>
          <!-- Guest menu -->
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="btn-register">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/presentation/stores/authStore';

/**
 * Navigation Bar Component
 * Displays navigation links and user authentication status
 */

// Router for navigation
const router = useRouter();

// Auth store for authentication state
const authStore = useAuthStore();

// Computed properties from auth store
const isAuthenticated = computed(() => authStore.isAuthenticated);
const userName = computed(() => authStore.userName);

/**
 * Handle user logout
 * Calls logout action and redirects to home page
 */
const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push('/');
  } catch (err) {
    console.error('Logout error:', err);
  }
};
</script>

<style scoped>
/* Navigation bar container */
.navbar {
  background-color: #2c3e50;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Inner container for content alignment */
.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Brand/Logo styling */
.navbar-brand a {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-brand a:hover {
  color: #42b983;
}

/* Navigation menu */
.navbar-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Navigation links */
.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #42b983;
}

.nav-link.router-link-active {
  color: #42b983;
  background-color: rgba(66, 185, 131, 0.1);
}

/* User info display */
.user-info {
  color: #42b983;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background-color: rgba(66, 185, 131, 0.1);
  border-radius: 4px;
}

/* Logout button */
.btn-logout {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
}

.btn-logout:hover {
  background-color: white;
  color: #2c3e50;
}

/* Register button */
.btn-register {
  background-color: #42b983;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-register:hover {
  background-color: #3aa876;
}

/* Responsive design */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 1rem;
  }

  .navbar-menu {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
