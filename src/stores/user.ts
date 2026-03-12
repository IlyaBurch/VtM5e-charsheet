import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface UserData {
  id: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const loading = ref(false)
  const user = ref<UserData | null>(null)
  const isLog = ref(false)

  const logOut = (): void => {
    localStorage.removeItem('token')
    user.value = null
    isLog.value = false
  }

  return { loading, user, isLog, logOut }
})
