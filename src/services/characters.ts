import { apiClient } from './api'
import type { CharacterListItem, CharacterResponse, CharacterPayload } from '@/types'

export const fetchCharacters = (): Promise<CharacterListItem[]> =>
  apiClient.get('/characters').then((r) => r.data)

export const fetchCharacter = (id: number): Promise<CharacterResponse> =>
  apiClient.get(`/characters/${id}`).then((r) => r.data)

export const createCharacter = (payload: CharacterPayload): Promise<CharacterResponse> =>
  apiClient.post('/characters', payload).then((r) => r.data)

export const updateCharacter = (id: number, payload: CharacterPayload): Promise<CharacterResponse> =>
  apiClient.put(`/characters/${id}`, payload).then((r) => r.data)

export const deleteCharacter = (id: number): Promise<void> =>
  apiClient.delete(`/characters/${id}`).then((r) => r.data)
