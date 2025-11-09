<template>
  <div id="app">
    <!-- Navigation Bar -->
    <NavBar />
    
    <!-- Main Content Area -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/presentation/components/NavBar.vue'
import { useAuthStore } from '@/presentation/stores/authStore'

/**
 * Main App Component
 * Root component that sets up the application layout and initializes authentication
 */

const authStore = useAuthStore()

/**
 * Check authentication status on app mount
 * This restores the user session if a valid token exists in local storage
 */
onMounted(async () => {
  try {
    await authStore.checkAuth()
  } catch (err) {
    // User is not authenticated, which is fine
    console.log('User not authenticated')
  }
})
</script>

<style>
/* Global styles */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Main content area */
.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}
</style>
