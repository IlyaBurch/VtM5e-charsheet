import { ref, computed, watch } from 'vue'
import type { CharacterSheet, ClanName, PredatorType, Sect, Attribute, Skill } from '@/types/vtm.types'
import { CLANS, getClanByName } from '@/data/clans.data'
import { BLOOD_POTENCY_TABLE, ATTRIBUTES, SKILLS, PREDATOR_TYPES } from '@/data/rules.data'

// ============================================================
// useCharacterSheet — основной composable для листа персонажа
// ============================================================

const defaultAttributes = () =>
  Object.fromEntries(
    ATTRIBUTES.map(a => [a.name, 1])
  ) as Record<Attribute, number>

const defaultSkills = () =>
  Object.fromEntries(
    SKILLS.map(s => [s.name, 0])
  ) as Record<Skill, number>

const createEmptySheet = (): CharacterSheet => ({
  name: '',
  player: '',
  chronicle: '',
  concept: '',
  clan: null,
  generation: 13,
  sire: '',
  sect: null,
  predatorType: null,

  attributes: defaultAttributes(),
  skills: defaultSkills(),

  disciplines: [],
  bloodPotency: 1,
  hunger: 1,
  humanity: 7,

  health: 3,
  willpower: 3,
  healthDamage: { superficial: 0, aggravated: 0 },
  willpowerDamage: { superficial: 0, aggravated: 0 },

  advantages: [],
  flaws: [],
  backgrounds: [],

  resonance: '',
  touchstones: [],
  convictions: [],
  ambition: '',
  desire: '',

  notes: '',
  experience: 0,
  totalExperience: 0,
})

export const useCharacterSheet = () => {
  const sheet = ref<CharacterSheet>(createEmptySheet())

  // ── Computed: Текущий клан ───────────────────────────────
  const selectedClan = computed(() =>
    sheet.value.clan ? getClanByName(sheet.value.clan) : null
  )

  // ── Computed: Blood Potency данные ───────────────────────
  const bloodPotencyData = computed(() =>
    BLOOD_POTENCY_TABLE.find(bp => bp.level === sheet.value.bloodPotency)
    ?? BLOOD_POTENCY_TABLE[1]
  )

  // ── Computed: Здоровье (базовое = Выносливость + 3) ─────
  const maxHealth = computed(() =>
    (sheet.value.attributes['Stamina'] ?? 1) + 3
  )

  // ── Computed: Воля (базовая = Самообладание + Решимость) ─
  const maxWillpower = computed(() =>
    (sheet.value.attributes['Composure'] ?? 1) +
    (sheet.value.attributes['Resolve'] ?? 1)
  )

  // ── Computed: Список Дисциплин клана ────────────────────
  const clanDisciplines = computed(() =>
    selectedClan.value?.disciplines ?? []
  )

  // ── Computed: Порок клана ────────────────────────────────
  const clanBane = computed(() => selectedClan.value?.bane ?? null)

  // ── Computed: Компульсия клана ───────────────────────────
  const clanCompulsion = computed(() => selectedClan.value?.compulsion ?? null)

  // ── Computed: Данные типа охоты ──────────────────────────
  const selectedPredatorType = computed(() =>
    sheet.value.predatorType
      ? PREDATOR_TYPES.find(p => p.name === sheet.value.predatorType)
      : null
  )

  // ── Watch: при смене клана — обновить дисциплины ────────
  watch(
    () => sheet.value.clan,
    (newClan) => {
      if (!newClan) {
        sheet.value.disciplines = []
        return
      }
      const clan = getClanByName(newClan)
      if (!clan) return

      // Оставляем только клановые дисциплины (убираем некланованные)
      const clanDiscNames = clan.disciplines.map(d => d.name)
      sheet.value.disciplines = sheet.value.disciplines.filter(d =>
        clanDiscNames.includes(d.name)
      )

      // Добавляем недостающие клановые дисциплины с 0 точками
      for (const disc of clan.disciplines) {
        if (!sheet.value.disciplines.find(d => d.name === disc.name)) {
          sheet.value.disciplines.push({ name: disc.name, dots: 0, selectedPowers: [] })
        }
      }

      // Обновляем секту если ещё не выбрана
      if (!sheet.value.sect && clan.sect.length === 1) {
        sheet.value.sect = clan.sect[0] as Sect
      }
    }
  )

  // ── Watch: при смене Типа охоты — применить бонусы ──────
  watch(
    () => sheet.value.predatorType,
    (newType, oldType) => {
      if (!newType) return
      const predator = PREDATOR_TYPES.find(p => p.name === newType)
      if (!predator) return

      // Убираем старый бонус если был
      if (oldType) {
        const oldPredator = PREDATOR_TYPES.find(p => p.name === oldType)
        if (oldPredator) {
          const oldDisc = sheet.value.disciplines.find(
            d => d.name === oldPredator.disciplineBonus.discipline
          )
          if (oldDisc && oldDisc.dots > 0) oldDisc.dots -= oldPredator.disciplineBonus.dots
        }
      }

      // Применяем новый бонус дисциплины
      const existingDisc = sheet.value.disciplines.find(
        d => d.name === predator.disciplineBonus.discipline
      )
      if (existingDisc) {
        existingDisc.dots += predator.disciplineBonus.dots
      } else {
        sheet.value.disciplines.push({
          name: predator.disciplineBonus.discipline,
          dots: predator.disciplineBonus.dots,
          selectedPowers: [],
        })
      }
    }
  )

  // ── Watch: обновлять здоровье и волю при смене атрибутов ─
  watch(
    () => [sheet.value.attributes['Stamina'], sheet.value.attributes['Composure'], sheet.value.attributes['Resolve']],
    () => {
      sheet.value.health = maxHealth.value
      sheet.value.willpower = maxWillpower.value
    }
  )

  // ── Actions ──────────────────────────────────────────────

  const setClan = (clanName: ClanName | null) => {
    sheet.value.clan = clanName
  }

  const setAttribute = (attr: Attribute, value: number) => {
    sheet.value.attributes[attr] = Math.max(1, Math.min(5, value))
  }

  const setSkill = (skill: Skill, value: number) => {
    sheet.value.skills[skill] = Math.max(0, Math.min(5, value))
  }

  const setDisciplineDots = (disciplineName: string, dots: number) => {
    const disc = sheet.value.disciplines.find(d => d.name === disciplineName)
    if (disc) disc.dots = Math.max(0, Math.min(5, dots))
  }

  const resetSheet = () => {
    sheet.value = createEmptySheet()
  }

  const exportSheet = () => JSON.stringify(sheet.value, null, 2)

  const importSheet = (json: string) => {
    try {
      const parsed = JSON.parse(json)
      sheet.value = { ...createEmptySheet(), ...parsed }
      return true
    } catch {
      return false
    }
  }

  // ── Return ───────────────────────────────────────────────
  return {
    sheet,

    // Computed
    selectedClan,
    bloodPotencyData,
    maxHealth,
    maxWillpower,
    clanDisciplines,
    clanBane,
    clanCompulsion,
    selectedPredatorType,

    // Static data
    clans: CLANS,
    attributes: ATTRIBUTES,
    skills: SKILLS,
    predatorTypes: PREDATOR_TYPES,
    bloodPotencyTable: BLOOD_POTENCY_TABLE,

    // Actions
    setClan,
    setAttribute,
    setSkill,
    setDisciplineDots,
    resetSheet,
    exportSheet,
    importSheet,
  }
}
