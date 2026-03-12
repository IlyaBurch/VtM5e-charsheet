import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import type { Character, CharacterPayload, CharacterResponse, Discipline } from '@/types'

function createDefaultCharacter(t: (key: string) => string): Character {
  return {
    charName: 'Новый персонаж',
    mainInfo: [
      { id: 1, name: 'Клан', value: '' },
      { id: 2, name: 'Хроника', value: '' },
      { id: 3, name: 'Сир', value: '' },
      { id: 4, name: 'Концепция', value: '' },
      { id: 5, name: 'Цель', value: '' },
      { id: 6, name: 'Прихоть', value: '' },
      { id: 7, name: 'Стиль охоты', value: '' },
      { id: 8, name: 'Поколение', value: '' },
      { id: 9, name: 'Резонанс', value: '' },
    ],
    attributes: [
      { id: 1, name: 'strength', ruName: 'Сила', value: 1 },
      { id: 2, name: 'dexterity', ruName: 'Ловкость', value: 1 },
      { id: 3, name: 'stamina', ruName: 'Выносливость', value: 1 },
      { id: 4, name: 'charisma', ruName: 'Обаяние', value: 1 },
      { id: 5, name: 'manipulation', ruName: 'Манипуляция', value: 1 },
      { id: 6, name: 'composure', ruName: 'Самообладание', value: 1 },
      { id: 7, name: 'intelligence', ruName: 'Интеллект', value: 1 },
      { id: 8, name: 'wits', ruName: 'Смекалка', value: 1 },
      { id: 9, name: 'resolve', ruName: 'Упорство', value: 1 },
    ],
    abilities: [
      { id: 1, ruName: 'Атлетика', value: 0 },
      { id: 2, ruName: 'Вождение', value: 0 },
      { id: 3, ruName: 'Воровство', value: 0 },
      { id: 4, ruName: 'Выживание', value: 0 },
      { id: 5, ruName: 'Драка', value: 0 },
      { id: 6, ruName: 'Ремесло', value: 0 },
      { id: 7, ruName: 'Скрытность', value: 0 },
      { id: 8, ruName: 'Стрельба', value: 0 },
      { id: 9, ruName: 'Фехтование', value: 0 },
      { id: 10, ruName: 'Запугивание', value: 0 },
      { id: 11, ruName: 'Исполнение', value: 0 },
      { id: 12, ruName: 'Лидерство', value: 0 },
      { id: 13, ruName: 'Обращение с животными', value: 0 },
      { id: 14, ruName: 'Проницательность', value: 0 },
      { id: 15, ruName: 'Убеждение', value: 0 },
      { id: 16, ruName: 'Уличное чутье', value: 0 },
      { id: 17, ruName: 'Хитрость', value: 0 },
      { id: 18, ruName: 'Этикет', value: 0 },
      { id: 19, ruName: 'Гуманитарные науки', value: 0 },
      { id: 20, ruName: 'Естественные науки', value: 0 },
      { id: 21, ruName: 'Медицина', value: 0 },
      { id: 22, ruName: 'Наблюдательность', value: 0 },
      { id: 23, ruName: 'Оккультизм', value: 0 },
      { id: 24, ruName: 'Политика', value: 0 },
      { id: 25, ruName: 'Расследование', value: 0 },
      { id: 26, ruName: 'Техника', value: 0 },
      { id: 27, ruName: 'Финансы', value: 0 },
    ],
    commons: [
      { id: 1, name: 'Здоровье', value: 10 },
      { id: 2, name: 'Воля', value: 10 },
      { id: 3, name: 'Голод', value: 5 },
      { id: 4, name: 'Человечность', value: 10 },
    ],
    common: {
      health: 0,
      maxHealth: 10,
      will: 0,
      maxWill: 10,
      humanity: 7,
      maxHumanity: 10,
      hunger: 1,
    },
    disciplines: [],
    tenets: '',
    touchStones: '',
    clanBane: '',
    advantages: [],
    bloodPotency: [],
    totalExperience: 0,
    spentExperience: 0,
    bodyInfo: [
      { id: 1, name: t('trueAge'), value: 0 },
      { id: 2, name: t('apparentAge'), value: 0 },
      { id: 3, name: t('dateOfBirth'), value: new Date() },
      { id: 4, name: t('dateOfDeath'), value: new Date() },
      { id: 5, name: t('appearance'), value: '' },
      { id: 6, name: t('distinguishingFeatures'), value: 0 },
      { id: 7, name: t('history'), value: 0 },
    ],
    notes: '',
  }
}

export const useCharacterStore = defineStore(
  'character',
  () => {
    const { t } = useI18n({
      messages: {
        en: {
          trueAge: 'True Age',
          apparentAge: 'Apparent Age',
          dateOfBirth: 'Date of Birth',
          dateOfDeath: 'Date of Death',
          appearance: 'Appearance',
          distinguishingFeatures: 'Distinguishing Features',
          history: 'History',
        },
        ru: {
          trueAge: 'Истинный возраст',
          apparentAge: 'Видимый возраст',
          dateOfBirth: 'Дата рождения',
          dateOfDeath: 'Дата смерти',
          appearance: 'Внешний вид',
          distinguishingFeatures: 'Отличительные черты',
          history: 'История',
        },
      },
    })

    const character = ref<Character>(createDefaultCharacter(t))
    const characterId = ref<number | null>(null)
    const isEdit = ref(false)

    function addDiscipline(id: number, name: string, value: number): void {
      character.value.disciplines.push({ id, name, value })
    }

    function removeDiscipline(id: number): void {
      removeMethod(id, character.value.disciplines)
    }

    function removeMethod(id: number, arr: Discipline[]): void {
      const index = arr.findIndex((item) => item.id === id)
      if (index !== -1) {
        arr.splice(index, 1)
      }
    }

    function save(): void {
      isEdit.value = false
    }

    function edit(): void {
      isEdit.value = true
    }

    function reset(): void {
      characterId.value = null
      isEdit.value = true
      character.value = createDefaultCharacter(t)
    }

    function loadCharacter(response: CharacterResponse): void {
      characterId.value = response.id
      character.value = response.data
      isEdit.value = false
    }

    const jsonData = computed<CharacterPayload>(() => ({
      name: character.value.charName,
      data: character.value,
    }))

    return {
      character,
      characterId,
      isEdit,
      addDiscipline,
      removeDiscipline,
      removeMethod,
      save,
      edit,
      reset,
      loadCharacter,
      jsonData,
    }
  },
  {
    persist: true,
  },
)
