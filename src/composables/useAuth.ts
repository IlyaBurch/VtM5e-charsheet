import { useMutation } from '@pinia/colada'
import { useRouter } from 'vue-router'
import { apiClient } from '@/services/api'
import { useUserStore } from '@/stores/user'
import type { AuthCredentials, AuthResponse } from '@/types'

export function useLoginMutation() {
  const userStore = useUserStore()
  const router = useRouter()

  return useMutation({
    mutation: (credentials: AuthCredentials): Promise<AuthResponse> =>
      apiClient.post('/auth/login', credentials).then((r) => r.data),
    onSuccess(data) {
      localStorage.setItem('token', data.token)
      userStore.user = { id: data.user.id, email: data.user.email }
      userStore.isLog = true
      router.push('/char')
    },
  })
}

export function useRegisterMutation() {
  const userStore = useUserStore()
  const router = useRouter()

  return useMutation({
    mutation: (credentials: AuthCredentials): Promise<AuthResponse> =>
      apiClient.post('/auth/register', credentials).then((r) => r.data),
    onSuccess(data) {
      localStorage.setItem('token', data.token)
      userStore.user = { id: data.user.id, email: data.user.email }
      userStore.isLog = true
      router.push('/char')
    },
  })
}

export function useLogoutMutation() {
  const userStore = useUserStore()
  const router = useRouter()

  return useMutation({
    mutation: (): Promise<void> =>
      apiClient.post('/auth/logout').then((r) => r.data).catch(() => {}),
    onSuccess() {
      userStore.logOut()
      router.push('/login')
    },
  })
}
