import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/presentation/views/HomeView.vue'
import UsersView from '@/presentation/views/UsersView.vue'
import LoginView from '@/presentation/views/LoginView.vue'
import RegisterView from '@/presentation/views/RegisterView.vue'
import { useAuthStore } from '@/presentation/stores/authStore'

/**
 * Vue Router Configuration
 * Defines application routes and navigation guards
 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true } // Only accessible to non-authenticated users
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true } // Only accessible to non-authenticated users
    }
  ]
})

/**
 * Navigation Guard
 * Redirects authenticated users away from login/register pages
 */
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires guest status (login/register pages)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirect authenticated users to home
    next('/')
  } else {
    // Allow navigation
    next()
  }
})

export default router
