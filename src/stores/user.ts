import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/supabase'
import { useRouter } from 'vue-router'
import type { AuthResponse } from '@supabase/supabase-js'

export const useUserStore = defineStore('user', () => {
  const loading = ref(false)
  const user = ref<AuthResponse['data'] | null>(null)
  const email = ref('')
  const password = ref('')
  const isLog = ref(false)
  const isCreated = ref(false)
  const router = useRouter()

  const handleLogin = async (): Promise<void> => {
    try {
      loading.value = true
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      user.value = data
      isLog.value = true
      router.push('/char')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading.value = false
    }
  }

  const createNewUser = async (): Promise<void> => {
    try {
      loading.value = true
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
      if (data) isCreated.value = true
      router.push('/char')
    } catch (error) {
      if (error instanceof Error) {
        alert('Ошибка:' + error.message)
      }
    } finally {
      loading.value = false
    }
  }

  const logOut = async (): Promise<void> => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      user.value = null
      isLog.value = false
    } catch (error) {
      if (error instanceof Error) {
        alert('Ошибка:' + error.message)
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, user, email, password, handleLogin, createNewUser, logOut, isLog, isCreated }
})
