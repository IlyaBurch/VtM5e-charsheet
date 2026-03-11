import { apiClient } from './api'
import type { CharacterPayload } from '@/types'

export const fetchCharacters = (): Promise<CharacterPayload[]> =>
  apiClient.get('/characters').then((r) => r.data)

export const fetchCharacter = (id: number): Promise<CharacterPayload> =>
  apiClient.get(`/characters/${id}`).then((r) => r.data)

export const createCharacter = (data: CharacterPayload): Promise<CharacterPayload> =>
  apiClient.post('/characters', data).then((r) => r.data)

export const updateCharacter = (id: number, data: CharacterPayload): Promise<CharacterPayload> =>
  apiClient.put(`/characters/${id}`, data).then((r) => r.data)

export const deleteCharacter = (id: number): Promise<void> =>
  apiClient.delete(`/characters/${id}`).then((r) => r.data)
