export interface MainInfoItem {
  id: number
  name: string
  value: string
}

export interface Attribute {
  id: number
  name: string
  ruName: string
  value: number
}

export interface Ability {
  id: number
  ruName: string
  value: number
}

export interface CommonItem {
  id: number
  name: string
  value: number
}

export interface Common {
  health: number
  maxHealth: number
  will: number
  maxWill: number
  humanity: number
  maxHumanity: number
  hunger: number
}

export interface Discipline {
  id: number
  name: string
  value: number
}

export interface BodyInfoItem {
  id: number
  name: string
  value: number | Date | string
}

export interface Character {
  charName: string
  mainInfo: MainInfoItem[]
  attributes: Attribute[]
  abilities: Ability[]
  commons: CommonItem[]
  common: Common
  disciplines: Discipline[]
  tenets: string
  touchStones: string
  clanBane: string
  advantages: Discipline[]
  bloodPotency: Discipline[]
  totalExperience: number
  spentExperience: number
  bodyInfo: BodyInfoItem[]
  notes: string
}

export interface MenuItem {
  label: string
  icon: string
  route?: string
  command?: () => void
  url?: string
  target?: string
}
