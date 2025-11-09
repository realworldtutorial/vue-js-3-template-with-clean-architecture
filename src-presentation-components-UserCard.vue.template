<template>
  <div class="user-card">
    <div class="user-avatar">
      {{ getInitials(user.name) }}
    </div>
    <div class="user-info">
      <h3>{{ user.name }}</h3>
      <p class="user-email">{{ user.email }}</p>
      <p class="user-id">ID: {{ user.id }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<style scoped>
.user-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b983, #35a372);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 18px;
}

.user-email {
  color: #666;
  margin: 4px 0;
  font-size: 14px;
}

.user-id {
  color: #999;
  font-size: 12px;
  margin: 4px 0;
}
</style>
