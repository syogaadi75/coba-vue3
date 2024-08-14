<template>
  <div>Default Layout <span v-text="nama"></span></div>
  <v-btn class="mb-4" color="blue elevation-0 mt-2 ml-3" @click="logout">Logout</v-btn>
  <router-view />
</template>
<script setup>
import router from '@/router'
import { useAuthStore } from '@/store'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const authStores = useAuthStore()
const { user } = storeToRefs(authStores)

const nama = ref(user.value.name || '')

const logout = () => {
  localStorage.removeItem('token')
  router.push({ name: 'login' })
}
</script>
<style></style>
