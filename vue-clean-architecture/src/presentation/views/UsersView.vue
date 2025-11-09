<template>
  <div class="container">
    <header class="header">
      <h1>Users Management</h1>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/users" class="nav-link">Users</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <div class="actions">
        <button @click="loadUsers" class="btn-primary" :disabled="loading">
          {{ loading ? 'Loading...' : 'Load Users' }}
        </button>
        <button @click="showAddForm = !showAddForm" class="btn-secondary">
          {{ showAddForm ? 'Cancel' : 'Add User' }}
        </button>
      </div>

      <!-- Add User Form -->
      <div v-if="showAddForm" class="form-card">
        <h3>Add New User</h3>
        <form @submit.prevent="handleAddUser">
          <div class="form-group">
            <label for="name">Name:</label>
            <input 
              id="name" 
              v-model="newUser.name" 
              type="text" 
              required 
              placeholder="Enter name"
            >
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              id="email" 
              v-model="newUser.email" 
              type="email" 
              required 
              placeholder="Enter email"
            >
          </div>
          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? 'Adding...' : 'Add User' }}
          </button>
        </form>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="clearError" class="btn-close">×</button>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !hasUsers" class="loading">
        Loading users...
      </div>

      <!-- Users List -->
      <div v-else-if="hasUsers" class="users-grid">
        <UserCard 
          v-for="user in users" 
          :key="user.id" 
          :user="user"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <p>No users loaded. Click "Load Users" to fetch data.</p>
      </div>

      <!-- Stats -->
      <div v-if="hasUsers" class="stats">
        <p>Total Users: <strong>{{ userCount }}</strong></p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/presentation/stores/userStore'
import { storeToRefs } from 'pinia'
import UserCard from '@/presentation/components/UserCard.vue'

const userStore = useUserStore()
const { users, loading, error, userCount, hasUsers } = storeToRefs(userStore)

const showAddForm = ref(false)
const newUser = ref({
  name: '',
  email: ''
})

const loadUsers = async () => {
  await userStore.fetchUsers()
}

const handleAddUser = async () => {
  try {
    await userStore.addUser(newUser.value)
    newUser.value = { name: '', email: '' }
    showAddForm.value = false
  } catch (err) {
    console.error('Failed to add user:', err)
  }
}

const clearError = () => {
  userStore.clearError()
}

onMounted(() => {
  if (!hasUsers.value) {
    loadUsers()
  }
})
</script>

<style scoped>
.header {
  padding: 20px 0;
  border-bottom: 2px solid #42b983;
  margin-bottom: 30px;
}

h1 {
  color: #42b983;
  margin-bottom: 20px;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: #42b983;
  color: white;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #35a372;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #dee2e6;
}

.btn-secondary:hover {
  background-color: #e9ecef;
}

.form-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #dee2e6;
}

.form-card h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #495057;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f5c6cb;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #721c24;
  padding: 0;
  width: 30px;
  height: 30px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 18px;
}

.stats {
  text-align: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 20px;
}

.stats strong {
  color: #42b983;
  font-size: 20px;
}
</style>
