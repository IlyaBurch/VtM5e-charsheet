import { useQuery, useMutation } from '@pinia/colada'
import {
  fetchCharacters,
  fetchCharacter,
  createCharacter,
  updateCharacter,
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

  return useMutation({
    mutation: (payload: CharacterPayload): Promise<CharacterResponse> => {
      const id = characterStore.characterId
      return id ? updateCharacter(id, payload) : createCharacter(payload)
    },
    onSuccess(data: CharacterResponse) {
      characterStore.characterId = data.id
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
