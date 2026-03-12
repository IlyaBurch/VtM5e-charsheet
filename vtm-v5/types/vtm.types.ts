// ============================================================
// VtM V5 — TypeScript Types
// ============================================================

export type DisciplineName =
  | 'Animalism'
  | 'Auspex'
  | 'Blood Sorcery'
  | 'Celerity'
  | 'Dominate'
  | 'Fortitude'
  | 'Obfuscate'
  | 'Oblivion'
  | 'Potence'
  | 'Presence'
  | 'Protean'
  | 'Thin-Blood Alchemy'

export type DisciplineNameRu =
  | 'Анимализм'
  | 'Прорицание'
  | 'Магия Крови'
  | 'Стремительность'
  | 'Доминирование'
  | 'Стойкость'
  | 'Незаметность'
  | 'Забвение'
  | 'Сила'
  | 'Присутствие'
  | 'Протеизм'
  | 'Алхимия Тонкой Крови'

export type ClanName =
  | 'Brujah'
  | 'Gangrel'
  | 'Hecata'
  | 'Lasombra'
  | 'Malkavian'
  | 'Ministry'
  | 'Nosferatu'
  | 'Ravnos'
  | 'Salubri'
  | 'Toreador'
  | 'Tremere'
  | 'Tzimisce'
  | 'Ventrue'
  | 'Banu Haqim'
  | 'Caitiff'
  | 'Thin-Blood'

export type Sect = 'Camarilla' | 'Anarch' | 'Sabbat' | 'Independent' | 'None'

export type AttributeCategory = 'physical' | 'social' | 'mental'

export type Attribute =
  | 'Strength'
  | 'Dexterity'
  | 'Stamina'
  | 'Charisma'
  | 'Manipulation'
  | 'Composure'
  | 'Intelligence'
  | 'Wits'
  | 'Resolve'

export type SkillCategory = 'physical' | 'social' | 'mental'

export type Skill =
  // Physical
  | 'Athletics'
  | 'Brawl'
  | 'Craft'
  | 'Drive'
  | 'Firearms'
  | 'Melee'
  | 'Larceny'
  | 'Stealth'
  | 'Survival'
  // Social
  | 'Animal Ken'
  | 'Etiquette'
  | 'Insight'
  | 'Intimidation'
  | 'Leadership'
  | 'Performance'
  | 'Persuasion'
  | 'Streetwise'
  | 'Subterfuge'
  // Mental
  | 'Academics'
  | 'Awareness'
  | 'Finance'
  | 'Investigation'
  | 'Medicine'
  | 'Occult'
  | 'Politics'
  | 'Science'
  | 'Technology'

export type PredatorType =
  | 'Alleycat'
  | 'Bagger'
  | 'Blood Leech'
  | 'Consensualist'
  | 'Extortionist'
  | 'Farmer'
  | 'Graverobber'
  | 'Osiris'
  | 'Sandman'
  | 'Scene Queen'
  | 'Siren'
  | 'Roadside Killer'

// ─── Discipline Power ────────────────────────────────────────

export type DisciplinePower = {
  level: 1 | 2 | 3 | 4 | 5
  name: string
  nameRu: string
  cost: string        // e.g. "Free", "1 Rouse Check"
  duration: string    // e.g. "Scene", "Instant"
  amalgam?: { discipline: DisciplineName; level: number }
  prerequisite?: string
  descriptionRu: string
}

export type Discipline = {
  name: DisciplineName
  nameRu: DisciplineNameRu
  descriptionRu: string
  powers: DisciplinePower[]
}

// ─── Clan ────────────────────────────────────────────────────

export type ClanDiscipline = {
  name: DisciplineName
  nameRu: DisciplineNameRu
}

export type Compulsion = {
  name: string
  nameRu: string
  descriptionRu: string
  mechanicRu: string
}

export type Clan = {
  name: ClanName
  nameRu: string
  nickname: string          // e.g. "Rabble", "Savages"
  nicknameRu: string
  sect: Sect[]
  disciplines: ClanDiscipline[]
  bane: {
    nameRu: string
    descriptionRu: string
    mechanicRu: string
  }
  compulsion: Compulsion
  loreRu: string            // Short lore blurb in Russian
  tips: string[]            // Roleplaying tips in Russian
}

// ─── Predator Type ───────────────────────────────────────────

export type PredatorTypeData = {
  name: PredatorType
  nameRu: string
  descriptionRu: string
  skillBonus: { skill: Skill; specialty?: string }[]
  disciplineBonus: { discipline: DisciplineName; dots: number }
  advantages: string[]
  disadvantages: string[]
  humanityEffect?: string
}

// ─── Blood Potency ───────────────────────────────────────────

export type BloodPotencyLevel = {
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  bloodSurge: number
  mendPerRouse: number
  powerBonus: number
  rouseReroll: number
  baneSeverity: number
  feedingPenalty: string
}

// ─── Character Sheet ─────────────────────────────────────────

export type CharacterAttributes = Record<Attribute, number>
export type CharacterSkills = Record<Skill, number>

export type CharacterDisciplineEntry = {
  name: DisciplineName
  dots: number
  selectedPowers: string[] // power names
}

export type CharacterSheet = {
  // Identity
  name: string
  player: string
  chronicle: string
  concept: string
  clan: ClanName | null
  generation: number
  sire: string
  sect: Sect | null
  predatorType: PredatorType | null

  // Traits
  attributes: Partial<CharacterAttributes>
  skills: Partial<CharacterSkills>

  // Vampire Stats
  disciplines: CharacterDisciplineEntry[]
  bloodPotency: number
  hunger: number
  humanity: number

  // Pools
  health: number
  willpower: number
  healthDamage: { superficial: number; aggravated: number }
  willpowerDamage: { superficial: number; aggravated: number }

  // Advantages
  advantages: string[]
  flaws: string[]
  backgrounds: string[]

  // Resonance & Touchstones
  resonance: string
  touchstones: string[]
  convictions: string[]
  ambition: string
  desire: string

  // Chronicle Notes
  notes: string
  experience: number
  totalExperience: number
}
