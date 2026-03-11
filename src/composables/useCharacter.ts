import { useQuery, useMutation } from '@pinia/colada'
import {
  fetchCharacters,
  fetchCharacter,
  createCharacter,
  updateCharacter,
} from '@/services/characters'
import { useCharacterStore } from '@/stores/character'
import { useUserStore } from '@/stores/user'
import type { CharacterPayload } from '@/types'

export function useCharactersQuery() {
  return useQuery({
    key: () => ['characters'],
    query: () => fetchCharacters(),
  })
}

export function useCharacterQuery(id: number) {
  return useQuery({
    key: () => ['character', id],
    query: () => fetchCharacter(id),
  })
}

export function useSaveCharacter() {
  const characterStore = useCharacterStore()

  return useMutation({
    mutation: (data: CharacterPayload): Promise<CharacterPayload> =>
      data.id ? updateCharacter(data.id, data) : createCharacter(data),
    onSuccess(data) {
      if (data.id) {
        characterStore.characterId = data.id
      }
    },
  })
}

export function useCharacterPayload(): CharacterPayload {
  const characterStore = useCharacterStore()
  const userStore = useUserStore()

  return {
    id: characterStore.characterId ?? undefined,
    userId: userStore.user?.id ?? '',
    charname: characterStore.character.charName,
    mainInfo: characterStore.character.mainInfo,
    attributes: characterStore.character.attributes,
    abilities: characterStore.character.abilities,
    commons: characterStore.character.commons,
    common: characterStore.character.common,
    disciplines: characterStore.character.disciplines,
  }
}
