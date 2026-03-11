import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export interface UserData {
  id: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const loading = ref(false)
  const user = ref<UserData | null>(null)
  const email = ref('')
  const password = ref('')
  const isLog = ref(false)
  const isCreated = ref(false)
  const router = useRouter()

  const handleLogin = async (): Promise<void> => {
    // TODO: implement with custom backend
    loading.value = true
    try {
      await router.push('/char')
    } finally {
      loading.value = false
    }
  }

  const createNewUser = async (): Promise<void> => {
    // TODO: implement with custom backend
    loading.value = true
    try {
      await router.push('/char')
    } finally {
      loading.value = false
    }
  }

  const logOut = async (): Promise<void> => {
    // TODO: implement with custom backend
    loading.value = true
    try {
      user.value = null
      isLog.value = false
    } finally {
      loading.value = false
    }
  }

  return { loading, user, email, password, handleLogin, createNewUser, logOut, isLog, isCreated }
})
