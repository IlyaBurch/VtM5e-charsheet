import { useQuery, useMutation, useQueryCache } from '@pinia/colada'
import {
  fetchMorkBorgCharacters,
  fetchMorkBorgCharacter,
  createMorkBorgCharacter,
  updateMorkBorgCharacter,
  deleteMorkBorgCharacter,
} from '@/services/morkborg'
import type { MorkBorgCharacter, MorkBorgListItem, MorkBorgResponse, MorkBorgPayload } from '@/types'

export function useMorkBorgListQuery() {
  return useQuery({
    key: () => ['morkborg', 'list'],
    query: (): Promise<MorkBorgListItem[]> => fetchMorkBorgCharacters(),
  })
}

export function useMorkBorgQuery(id: string) {
  return useQuery({
    key: () => ['morkborg', id],
    query: (): Promise<MorkBorgCharacter> => fetchMorkBorgCharacter(id),
  })
}

export function useCreateMorkBorg() {
  const queryCache = useQueryCache()
  return useMutation({
    mutation: (payload: MorkBorgPayload): Promise<MorkBorgResponse> =>
      createMorkBorgCharacter(payload),
    onSuccess() {
      queryCache.invalidateQueries({ key: ['morkborg', 'list'] })
    },
  })
}

export function useUpdateMorkBorg() {
  const queryCache = useQueryCache()
  return useMutation({
    mutation: ({ id, payload }: { id: string; payload: MorkBorgPayload }): Promise<MorkBorgResponse> =>
      updateMorkBorgCharacter(id, payload),
    onSuccess(_, vars) {
      queryCache.invalidateQueries({ key: ['morkborg', vars.id] })
    },
  })
}

export function useDeleteMorkBorg() {
  const queryCache = useQueryCache()
  return useMutation({
    mutation: (id: string): Promise<void> => deleteMorkBorgCharacter(id),
    onSuccess() {
      queryCache.invalidateQueries({ key: ['morkborg', 'list'] })
    },
  })
}
