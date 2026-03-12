import { useQuery, useMutation, useQueryCache } from '@pinia/colada'
import { useRouter } from 'vue-router'
import {
  fetchCharacters,
  fetchCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from '@/services/characters'
import { useCharacterStore } from '@/stores/character'
import type { CharacterListItem, CharacterResponse, CharacterPayload } from '@/types'

export function useCharactersQuery() {
  return useQuery({
    key: () => ['characters'],
    query: (): Promise<CharacterListItem[]> => fetchCharacters(),
  })
}

export function useCharacterQuery(id: number) {
  return useQuery({
    key: () => ['character', id],
    query: (): Promise<CharacterResponse> => fetchCharacter(id),
  })
}

export function useSaveCharacter() {
  const characterStore = useCharacterStore()
  const router = useRouter()

  return useMutation({
    mutation: (payload: CharacterPayload): Promise<CharacterResponse> => {
      const id = characterStore.characterId
      return id ? updateCharacter(id, payload) : createCharacter(payload)
    },
    onSuccess(data: CharacterResponse) {
      const isNew = !characterStore.characterId
      characterStore.characterId = data.id
      if (isNew) router.replace(`/${data.id}`)
    },
  })
}

export function useDeleteCharacter() {
  const router = useRouter()
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (id: number): Promise<void> => deleteCharacter(id),
    onSuccess() {
      queryCache.invalidateQueries({ key: ['characters'] })
      router.push('/characters')
    },
  })
}

export function useCharacterPayload(): CharacterPayload {
  const characterStore = useCharacterStore()

  return {
    name: characterStore.character.charName,
    data: characterStore.character,
  }
}
