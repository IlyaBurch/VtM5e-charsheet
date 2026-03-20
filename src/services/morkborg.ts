import { apiClient } from './api'
import type { MorkBorgCharacter, MorkBorgListItem, MorkBorgResponse, MorkBorgPayload } from '@/types'

export const fetchMorkBorgCharacters = (): Promise<MorkBorgListItem[]> =>
  apiClient.get('/morkborg/characters').then((r) => r.data.characters)

export const fetchMorkBorgCharacter = (id: string): Promise<MorkBorgCharacter> =>
  apiClient.get(`/morkborg/characters/${id}`).then((r) => {
    const { id: _id, userId: _userId, createdAt: _createdAt, updatedAt: _updatedAt, ...char } = (r.data.character ?? r.data) as MorkBorgResponse
    return {
      ...char,
      abilities:  char.abilities  ?? [],
      weapons:    char.weapons    ?? [],
      equipment:  char.equipment  ?? [],
      sufferings: char.sufferings ?? [false, false, false, false, false, false],
    } as MorkBorgCharacter
  })

export const createMorkBorgCharacter = (payload: MorkBorgPayload): Promise<MorkBorgResponse> =>
  apiClient.post('/morkborg/characters', payload).then((r) => r.data)

export const updateMorkBorgCharacter = (id: string, payload: MorkBorgPayload): Promise<MorkBorgResponse> =>
  apiClient.patch(`/morkborg/characters/${id}`, payload).then((r) => r.data)

export const deleteMorkBorgCharacter = (id: string): Promise<void> =>
  apiClient.delete(`/morkborg/characters/${id}`).then((r) => r.data)
