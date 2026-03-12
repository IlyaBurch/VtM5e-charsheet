import type {
  BloodPotencyLevel,
  PredatorTypeData,
  Skill,
  Attribute,
} from '@/types/vtm.types'

// ============================================================
// VtM V5 — Атрибуты
// ============================================================

export const ATTRIBUTES: { name: Attribute; nameRu: string; category: 'physical' | 'social' | 'mental' }[] = [
  // Physical
  { name: 'Strength',     nameRu: 'Сила',           category: 'physical' },
  { name: 'Dexterity',    nameRu: 'Ловкость',        category: 'physical' },
  { name: 'Stamina',      nameRu: 'Выносливость',    category: 'physical' },
  // Social
  { name: 'Charisma',     nameRu: 'Харизма',         category: 'social' },
  { name: 'Manipulation', nameRu: 'Манипуляция',     category: 'social' },
  { name: 'Composure',    nameRu: 'Самообладание',   category: 'social' },
  // Mental
  { name: 'Intelligence', nameRu: 'Интеллект',       category: 'mental' },
  { name: 'Wits',         nameRu: 'Смекалка',        category: 'mental' },
  { name: 'Resolve',      nameRu: 'Решимость',       category: 'mental' },
]

// ============================================================
// VtM V5 — Навыки
// ============================================================

export const SKILLS: { name: Skill; nameRu: string; category: 'physical' | 'social' | 'mental' }[] = [
  // Physical
  { name: 'Athletics',  nameRu: 'Атлетика',        category: 'physical' },
  { name: 'Brawl',      nameRu: 'Рукопашный бой',  category: 'physical' },
  { name: 'Craft',      nameRu: 'Ремесло',         category: 'physical' },
  { name: 'Drive',      nameRu: 'Вождение',        category: 'physical' },
  { name: 'Firearms',   nameRu: 'Огнестрельное',   category: 'physical' },
  { name: 'Melee',      nameRu: 'Холодное оружие', category: 'physical' },
  { name: 'Larceny',    nameRu: 'Воровство',       category: 'physical' },
  { name: 'Stealth',    nameRu: 'Скрытность',      category: 'physical' },
  { name: 'Survival',   nameRu: 'Выживание',       category: 'physical' },
  // Social
  { name: 'Animal Ken', nameRu: 'Обращение с животными', category: 'social' },
  { name: 'Etiquette',  nameRu: 'Этикет',          category: 'social' },
  { name: 'Insight',    nameRu: 'Проницательность', category: 'social' },
  { name: 'Intimidation', nameRu: 'Запугивание',   category: 'social' },
  { name: 'Leadership', nameRu: 'Лидерство',       category: 'social' },
  { name: 'Performance', nameRu: 'Выступление',    category: 'social' },
  { name: 'Persuasion', nameRu: 'Убеждение',       category: 'social' },
  { name: 'Streetwise', nameRu: 'Знание улиц',     category: 'social' },
  { name: 'Subterfuge', nameRu: 'Хитрость',        category: 'social' },
  // Mental
  { name: 'Academics',     nameRu: 'Академические знания', category: 'mental' },
  { name: 'Awareness',     nameRu: 'Восприятие',    category: 'mental' },
  { name: 'Finance',       nameRu: 'Финансы',       category: 'mental' },
  { name: 'Investigation', nameRu: 'Расследование', category: 'mental' },
  { name: 'Medicine',      nameRu: 'Медицина',      category: 'mental' },
  { name: 'Occult',        nameRu: 'Оккультизм',   category: 'mental' },
  { name: 'Politics',      nameRu: 'Политика',      category: 'mental' },
  { name: 'Science',       nameRu: 'Наука',         category: 'mental' },
  { name: 'Technology',    nameRu: 'Технологии',    category: 'mental' },
]

// ============================================================
// VtM V5 — Типы охоты (Predator Types)
// ============================================================

export const PREDATOR_TYPES: PredatorTypeData[] = [
  {
    name: 'Alleycat',
    nameRu: 'Уличный кот',
    descriptionRu: 'Охотник в тёмных переулках, нападает и берёт силой.',
    skillBonus: [
      { skill: 'Brawl', specialty: 'Клинч' },
      { skill: 'Stealth' },
    ],
    disciplineBonus: { discipline: 'Celerity', dots: 1 },
    advantages: ['Добавь 1 точку Бесчеловечности (если Человечность < 8)'],
    disadvantages: ['–1 к Человечности при создании'],
    humanityEffect: '-1 Humanity если ≥ 6',
  },
  {
    name: 'Bagger',
    nameRu: 'Собиратель',
    descriptionRu: 'Питается из пакетов с кровью, не охотясь на живых.',
    skillBonus: [
      { skill: 'Streetwise' },
      { skill: 'Larceny' },
    ],
    disciplineBonus: { discipline: 'Obfuscate', dots: 1 },
    advantages: ['Никогда не рискует Маскарадом при охоте'],
    disadvantages: ['Кровь из пакетов утоляет Голод только на 1 за порцию', 'Нет специализации в живой охоте'],
  },
  {
    name: 'Blood Leech',
    nameRu: 'Кровопийца',
    descriptionRu: 'Питается исключительно кровью других вампиров.',
    skillBonus: [
      { skill: 'Brawl' },
      { skill: 'Stealth' },
    ],
    disciplineBonus: { discipline: 'Potence', dots: 1 },
    advantages: ['Диаблери легче (–1 к Сложности)'],
    disadvantages: ['–2 к Человечности при создании', 'Враг всего вампирского сообщества'],
    humanityEffect: '-2 Humanity',
  },
  {
    name: 'Consensualist',
    nameRu: 'Согласователь',
    descriptionRu: 'Ищет добровольных доноров, старается не причинять вреда.',
    skillBonus: [
      { skill: 'Medicine' },
      { skill: 'Persuasion' },
    ],
    disciplineBonus: { discipline: 'Auspex', dots: 1 },
    advantages: ['+1 к Человечности при создании'],
    disadvantages: ['Нарушение согласия ведёт к потере Человечности'],
    humanityEffect: '+1 Humanity',
  },
  {
    name: 'Extortionist',
    nameRu: 'Вымогатель',
    descriptionRu: 'Шантажирует или принуждает к "добровольной" сдаче крови.',
    skillBonus: [
      { skill: 'Intimidation' },
      { skill: 'Subterfuge' },
    ],
    disciplineBonus: { discipline: 'Dominate', dots: 1 },
    advantages: ['Дополнительный фон: Контакты 1'],
    disadvantages: ['Враги среди тех, кого эксплуатирует'],
  },
  {
    name: 'Farmer',
    nameRu: 'Фермер',
    descriptionRu: 'Питается от животных, избегая контакта с людьми.',
    skillBonus: [
      { skill: 'Animal Ken' },
      { skill: 'Survival' },
    ],
    disciplineBonus: { discipline: 'Animalism', dots: 1 },
    advantages: ['+1 к Человечности при создании'],
    disadvantages: ['Кровь животных менее питательна (Голод снижается на 1 меньше)', 'Нельзя питаться от людей без проверки Воли'],
    humanityEffect: '+1 Humanity',
  },
  {
    name: 'Graverobber',
    nameRu: 'Осквернитель могил',
    descriptionRu: 'Питается от умирающих или недавно умерших.',
    skillBonus: [
      { skill: 'Medicine' },
      { skill: 'Occult' },
    ],
    disciplineBonus: { discipline: 'Fortitude', dots: 1 },
    advantages: ['Кровь умирающих содержит Меланхолию (Резонанс)', 'Легко находить тела'],
    disadvantages: ['Кровь мёртвых даёт только 1 Голод', '–1 к Человечности при создании'],
    humanityEffect: '-1 Humanity',
  },
  {
    name: 'Osiris',
    nameRu: 'Осирис',
    descriptionRu: 'Лидер культа или публичная фигура, питающаяся от фанатиков.',
    skillBonus: [
      { skill: 'Occult' },
      { skill: 'Performance' },
    ],
    disciplineBonus: { discipline: 'Presence', dots: 1 },
    advantages: ['Фон: Стадо 2 (Herd)', 'Публичность защищает через известность'],
    disadvantages: ['Фан-база требует постоянного внимания', 'Уязвим к Маскарад-угрозам через публичность'],
  },
  {
    name: 'Sandman',
    nameRu: 'Песочный человек',
    descriptionRu: 'Питается от спящих жертв, не оставляя воспоминаний.',
    skillBonus: [
      { skill: 'Stealth' },
      { skill: 'Medicine' },
    ],
    disciplineBonus: { discipline: 'Auspex', dots: 1 },
    advantages: ['Жертвы редко помнят укус', '+1 к броскам на незаметность при охоте'],
    disadvantages: ['Требует доступа к жилищам жертв', 'Только ночная охота в спальнях'],
  },
  {
    name: 'Scene Queen',
    nameRu: 'Звезда сцены',
    descriptionRu: 'Питается в субкультурных тусовках (готы, металлисты, ролевики).',
    skillBonus: [
      { skill: 'Etiquette', specialty: 'Субкультуры' },
      { skill: 'Streetwise' },
    ],
    disciplineBonus: { discipline: 'Presence', dots: 1 },
    advantages: ['Фон: Стадо 1', '+1 к броскам в своей субкультурной среде'],
    disadvantages: ['Ограничена определённой субкультурой', 'Потеря репутации в тусовке — потеря охотничьих угодий'],
  },
  {
    name: 'Siren',
    nameRu: 'Сирена',
    descriptionRu: 'Соблазняет и обольщает жертв, питаясь во время близости.',
    skillBonus: [
      { skill: 'Persuasion' },
      { skill: 'Subterfuge' },
    ],
    disciplineBonus: { discipline: 'Presence', dots: 1 },
    advantages: ['Жертвы рады "вернуться"', 'Лёгкий доступ к частным местам'],
    disadvantages: ['Зависимость жертв создаёт осложнения', 'Опасность создать нежелательных гулей'],
  },
  {
    name: 'Roadside Killer',
    nameRu: 'Придорожный убийца',
    descriptionRu: 'Охотится на попутчиков и случайных встречных, не оставляя свидетелей.',
    skillBonus: [
      { skill: 'Drive' },
      { skill: 'Survival' },
    ],
    disciplineBonus: { discipline: 'Fortitude', dots: 1 },
    advantages: ['Жертв никогда не хватятся быстро', 'Свобода передвижения'],
    disadvantages: ['–2 к Человечности при создании', 'Постоянный риск улик'],
    humanityEffect: '-2 Humanity',
  },
]

// ============================================================
// VtM V5 — Мощь Крови (Blood Potency)
// ============================================================

export const BLOOD_POTENCY_TABLE: BloodPotencyLevel[] = [
  {
    level: 0,
    bloodSurge: 1,
    mendPerRouse: 1,
    powerBonus: 0,
    rouseReroll: 0,
    baneSeverity: 0,
    feedingPenalty: 'Нет',
  },
  {
    level: 1,
    bloodSurge: 2,
    mendPerRouse: 1,
    powerBonus: 0,
    rouseReroll: 0,
    baneSeverity: 2,
    feedingPenalty: 'Нет',
  },
  {
    level: 2,
    bloodSurge: 2,
    mendPerRouse: 2,
    powerBonus: 1,
    rouseReroll: 1,
    baneSeverity: 2,
    feedingPenalty: 'Животные утоляют вполовину меньше Голода',
  },
  {
    level: 3,
    bloodSurge: 3,
    mendPerRouse: 2,
    powerBonus: 1,
    rouseReroll: 1,
    baneSeverity: 3,
    feedingPenalty: 'Животные не утоляют Голод',
  },
  {
    level: 4,
    bloodSurge: 3,
    mendPerRouse: 3,
    powerBonus: 2,
    rouseReroll: 2,
    baneSeverity: 3,
    feedingPenalty: 'Слабая кровь (тонкокровные) не утоляет Голод',
  },
  {
    level: 5,
    bloodSurge: 4,
    mendPerRouse: 3,
    powerBonus: 2,
    rouseReroll: 2,
    baneSeverity: 4,
    feedingPenalty: 'Только кровь с сильным Резонансом утоляет Голод полностью',
  },
  {
    level: 6,
    bloodSurge: 4,
    mendPerRouse: 3,
    powerBonus: 3,
    rouseReroll: 3,
    baneSeverity: 4,
    feedingPenalty: 'Только смертная кровь с Резонансом',
  },
  {
    level: 7,
    bloodSurge: 5,
    mendPerRouse: 3,
    powerBonus: 3,
    rouseReroll: 3,
    baneSeverity: 5,
    feedingPenalty: 'Только кровь вампиров',
  },
  {
    level: 8,
    bloodSurge: 5,
    mendPerRouse: 4,
    powerBonus: 4,
    rouseReroll: 4,
    baneSeverity: 5,
    feedingPenalty: 'Только кровь вампиров 8 поколения и выше',
  },
  {
    level: 9,
    bloodSurge: 6,
    mendPerRouse: 4,
    powerBonus: 4,
    rouseReroll: 4,
    baneSeverity: 6,
    feedingPenalty: 'Только кровь вампиров 7 поколения и выше',
  },
  {
    level: 10,
    bloodSurge: 6,
    mendPerRouse: 5,
    powerBonus: 5,
    rouseReroll: 5,
    baneSeverity: 6,
    feedingPenalty: 'Только кровь вампиров 4 поколения и выше',
  },
]

// ============================================================
// VtM V5 — Поколения
// ============================================================

export const GENERATIONS = Array.from({ length: 8 }, (_, i) => ({
  value: i + 6,
  label: `${i + 6}-е поколение`,
  maxBloodPotency: [10, 10, 10, 8, 7, 6, 5, 4][i],
  maxAttribute: [10, 10, 10, 10, 9, 8, 7, 6][i],
}))

// ============================================================
// VtM V5 — Секты
// ============================================================

export const SECTS = [
  { value: 'Camarilla', label: 'Камарилья' },
  { value: 'Anarch',    label: 'Анархи' },
  { value: 'Sabbat',    label: 'Шабаш' },
  { value: 'Independent', label: 'Независимые' },
  { value: 'None',      label: 'Нет' },
] as const

// ============================================================
// VtM V5 — Резонансы
// ============================================================

export const RESONANCES = [
  {
    name: 'Choleric',
    nameRu: 'Холерический',
    emotion: 'Гнев, ярость, ненависть',
    discipline: 'Celerity' as const,
    descriptionRu: 'Кровь злых, раздражительных, агрессивных людей',
  },
  {
    name: 'Melancholic',
    nameRu: 'Меланхолический',
    emotion: 'Печаль, тоска, депрессия',
    discipline: 'Fortitude' as const,
    descriptionRu: 'Кровь грустных, депрессивных, тоскующих людей',
  },
  {
    name: 'Phlegmatic',
    nameRu: 'Флегматический',
    emotion: 'Безразличие, спокойствие, вялость',
    discipline: 'Auspex' as const,
    descriptionRu: 'Кровь апатичных, безразличных, вялых людей',
  },
  {
    name: 'Sanguine',
    nameRu: 'Сангвинический',
    emotion: 'Радость, страсть, похоть',
    discipline: 'Presence' as const,
    descriptionRu: 'Кровь весёлых, влюблённых, страстных людей',
  },
  {
    name: 'Empty',
    nameRu: 'Пустой',
    emotion: 'Ничего',
    discipline: 'Oblivion' as const,
    descriptionRu: 'Кровь психопатов или людей без эмоций',
  },
]
