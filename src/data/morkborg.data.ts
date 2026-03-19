export interface MorkBorgStat {
  name: string
  modifier: string
  raw: number
}

export interface MorkBorgWeapon {
  name: string
  damage: string
  special: string
}

export interface MorkBorgClassAbility {
  name: string
  description: string
}

export interface MorkBorgCharacter {
  name: string
  class: string
  description: string
  grit: string
  classAbilities: MorkBorgClassAbility[]
  stats: MorkBorgStat[]
  hp: { current: number; max: number }
  weapons: MorkBorgWeapon[]
  armor: { name: string; reduction: string }
  suffering: number   // 0–6, how many cells are active
  equipment: string[] // 9 slots (3×3 grid)
  silver: number
  omens: { total: number; used: number }
  notes: string
}

export const MOCK_MORK_CHARACTER: MorkBorgCharacter = {
  name: 'Руствед Безглазый',
  class: 'Проклятый Скиталец',
  description:
    'Бывший рыцарь Двухголового Василиска. Его глаза выжгли демоны в ночь Чёрной Пасхи. Теперь он видит только тени грехов.',
  grit: 'РС 12 или -д2 ОЗ + лишение сил на 1 час',
  classAbilities: [
    {
      name: 'Кровавая Месть',
      description:
        'Раз в день, когда враг снижает ОЗ до половины, перебросить кубик урона и взять лучший результат.',
    },
    {
      name: 'Несломленный',
      description: '+д4 к броскам Стойкости, пока у персонажа меньше половины максимальных ОЗ.',
    },
  ],
  stats: [
    { name: 'Сила',      modifier: '+2', raw: 17 },
    { name: 'Ловкость',  modifier: '-1', raw: 8  },
    { name: 'Стойкость', modifier: '+1', raw: 13 },
    { name: 'Присутствие', modifier: '0', raw: 11 },
  ],
  hp: { current: 8, max: 12 },
  weapons: [
    { name: 'Двуручный меч', damage: 'д10', special: 'Медленное оружие' },
    { name: 'Кинжал',        damage: 'д4',  special: '' },
  ],
  armor: { name: 'Кольчуга', reduction: 'д2' },
  suffering: 2,
  equipment: [
    'Факел × 3',
    'Верёвка 10м',
    'Сухари',
    'Кремень и кресало',
    'Мешок',
    'Склянка кислоты',
    '',
    '',
    '',
  ],
  silver: 23,
  omens: { total: 3, used: 1 },
  notes: '',
}
