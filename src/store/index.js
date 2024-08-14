import customAxios from '@/api'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)
  const isError = ref(false)
  const message = ref('')
  const user = ref(null)

  const loginUser = async (payload) => {
    isLoading.value = true
    isError.value = false
    try {
      const { data } = await customAxios.post('/users/login', payload)
      user.value = data.data.user
      localStorage.setItem('token', data.data.access_token)
      router.push({ name: 'home' })
      isLoading.value = false
    } catch (error) {
      isError.value = true
      message.value = error.response.data.message
      isLoading.value = false
    }
  }

  const me = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const { data } = await customAxios.get('/users/me')
      user.value = data.data
      isLoading.value = false
    } catch (error) {
      isError.value = true
      console.log(error, 'error')
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    message,
    user,
    me,
    loginUser
  }
})
