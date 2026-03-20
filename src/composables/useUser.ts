import { useMutation } from '@pinia/colada'
import { apiClient } from '@/services/api'
import { useUserStore } from '@/stores/user'
import type { UserData } from '@/stores/user'

export function useUpdateUserMutation() {
  const userStore = useUserStore()

  return useMutation({
    mutation: (data: Partial<Pick<UserData, 'username' | 'avatarUrl'>>): Promise<UserData> =>
      apiClient.patch('/user/me', data).then((r) => r.data),
    onSuccess(data) {
      userStore.user = data
    },
  })
}
