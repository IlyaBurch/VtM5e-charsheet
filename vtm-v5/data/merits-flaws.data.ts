// ============================================================
// VtM V5 — Достоинства и Недостатки (на русском)
// Источник: V5 Core Rulebook + Players Guide
// ============================================================

export type MeritFlawCategory =
  | 'Innate'       // Врождённые
  | 'Feeding'      // Питание
  | 'Haven'        // Логово
  | 'Herd'         // Стадо
  | 'Influence'    // Влияние
  | 'Looks'        // Внешность
  | 'Mythical'     // Мифические
  | 'Psychological' // Психологические
  | 'Thin-Blood'   // Тонкокровные

export type MeritFlaw = {
  name: string
  nameRu: string
  type: 'merit' | 'flaw'
  dots: number | number[]   // 1-5 или [1,2,3] для нескольких вариантов
  category: MeritFlawCategory
  categoryRu: string
  descriptionRu: string
  mechanicRu?: string
  clanRestriction?: string[] // если только для определённых кланов
}

const CAT: Record<MeritFlawCategory, string> = {
  Innate: 'Врождённые',
  Feeding: 'Питание',
  Haven: 'Логово',
  Herd: 'Стадо',
  Influence: 'Влияние',
  Looks: 'Внешность',
  Mythical: 'Мифические',
  Psychological: 'Психологические',
  'Thin-Blood': 'Тонкокровные',
}

// ─── ДОСТОИНСТВА ─────────────────────────────────────────────

export const MERITS: MeritFlaw[] = [
  // ── Врождённые ───────────────────────────────────────────
  {
    name: 'Ambidextrous',
    nameRu: 'Амбидекстр',
    type: 'merit',
    dots: 1,
    category: 'Innate',
    categoryRu: CAT.Innate,
    descriptionRu: 'Вампир одинаково хорошо владеет обеими руками. Никакого штрафа за действия нерабочей рукой.',
  },
  {
    name: 'Danger Sense',
    nameRu: 'Чувство опасности',
    type: 'merit',
    dots: 2,
    category: 'Innate',
    categoryRu: CAT.Innate,
    descriptionRu: 'Вампир чувствует угрозу даже во сне. +2 кубика к броскам на обнаружение засад и опасностей.',
  },
  {
    name: 'Iron Will',
    nameRu: 'Железная воля',
    type: 'merit',
    dots: [2, 3],
    category: 'Innate',
    categoryRu: CAT.Innate,
    descriptionRu: 'Исключительная сила воли. На 2 точки: +1 Воля. На 3 точки: +2 Воля.',
    mechanicRu: 'Добавляет точки к максимальной Воле персонажа.',
  },
  {
    name: 'Lightning Reflexes',
    nameRu: 'Молниеносные рефлексы',
    type: 'merit',
    dots: 2,
    category: 'Innate',
    categoryRu: CAT.Innate,
    descriptionRu: 'Никогда не застаётся врасплох. +2 кубика к броскам инициативы.',
  },
  {
    name: 'Eidetic Memory',
    nameRu: 'Эйдетическая память',
    type: 'merit',
    dots: 2,
    category: 'Innate',
    categoryRu: CAT.Innate,
    descriptionRu: 'Идеальная память. Вампир точно помнит всё, что видел или слышал.',
  },
  {
    name: 'Unbondable',
    nameRu: 'Несвязуемый',
    type: 'merit',
    dots: 5,
    category: 'Mythical',
    categoryRu: CAT.Mythical,
    descriptionRu: 'Вампир не может стать жертвой Кровной Связи. Его кровь не оказывает обычного эффекта при создании связи.',
  },
  {
    name: 'Bloodhound',
    nameRu: 'Ищейка',
    type: 'merit',
    dots: 2,
    category: 'Innate',
    categoryRu: CAT.Innate,
    descriptionRu: 'Исключительное обоняние. +3 кубика к проверкам на запах, способен распознать клан по запаху крови.',
  },

  // ── Питание ──────────────────────────────────────────────
  {
    name: 'Iron Gullet',
    nameRu: 'Стальная глотка',
    type: 'merit',
    dots: 3,
    category: 'Feeding',
    categoryRu: CAT.Feeding,
    descriptionRu: 'Вампир может питаться из трупов и гнилой крови без негативных эффектов. Это стандартно запрещено для большинства вампиров.',
  },
  {
    name: 'Herd',
    nameRu: 'Стадо',
    type: 'merit',
    dots: [1, 2, 3, 4, 5],
    category: 'Herd',
    categoryRu: CAT.Herd,
    descriptionRu: 'Группа доверенных доноров, готовых кормить вампира добровольно. Каждая точка — это один надёжный донор или небольшая группа.',
    mechanicRu: 'Снижает Голод на 1 за каждые 2 точки Стада раз в неделю без риска.',
  },
  {
    name: 'Vessel Recognition',
    nameRu: 'Распознавание жертвы',
    type: 'merit',
    dots: 1,
    category: 'Feeding',
    categoryRu: CAT.Feeding,
    descriptionRu: 'Вампир с первого взгляда определяет тип резонанса в крови жертвы — холерик, меланхолик и т.д.',
  },

  // ── Логово ───────────────────────────────────────────────
  {
    name: 'Haven',
    nameRu: 'Логово',
    type: 'merit',
    dots: [1, 2, 3, 4, 5],
    category: 'Haven',
    categoryRu: CAT.Haven,
    descriptionRu: 'Безопасное убежище. Каждая точка добавляет характеристику: охрана, тайный выход, укреплённые двери, тюремная камера, арсенал и т.д.',
  },

  // ── Влияние ──────────────────────────────────────────────
  {
    name: 'Allies',
    nameRu: 'Союзники',
    type: 'merit',
    dots: [1, 2, 3, 4, 5],
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Надёжные союзники среди смертных — журналисты, полицейские, врачи. Каждая точка — один влиятельный контакт или небольшая группа.',
  },
  {
    name: 'Contacts',
    nameRu: 'Контакты',
    type: 'merit',
    dots: [1, 2, 3, 4, 5],
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Широкая сеть информаторов. Каждая точка — один специфический круг (преступники, политики, academia и т.д.).',
  },
  {
    name: 'Fame',
    nameRu: 'Известность',
    type: 'merit',
    dots: [1, 2, 3],
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Вампир известен среди смертных. +1 кубик к социальным броскам с фанатами. Но известность привлекает внимание Маскарада.',
  },
  {
    name: 'Mawla',
    nameRu: 'Покровитель',
    type: 'merit',
    dots: [1, 2, 3, 4, 5],
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Старший вампир-наставник, покровительствующий персонажу. Каждая точка — уровень силы и влияния покровителя.',
  },
  {
    name: 'Resources',
    nameRu: 'Ресурсы',
    type: 'merit',
    dots: [1, 2, 3, 4, 5],
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Финансовый капитал: 1 — прожиточный минимум, 3 — комфортная жизнь, 5 — олигарх.',
  },
  {
    name: 'Status',
    nameRu: 'Статус',
    type: 'merit',
    dots: [1, 2, 3, 4, 5],
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Положение в вампирском обществе. Каждая точка повышает значимость персонажа в иерархии секты или клана.',
  },
  {
    name: 'Retainers',
    nameRu: 'Слуги',
    type: 'merit',
    dots: [1, 2, 3, 4, 5],
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Преданные слуги — люди или гули, выполняющие поручения. Каждая точка — один преданный слуга с соответствующими навыками.',
  },

  // ── Внешность ────────────────────────────────────────────
  {
    name: 'Beautiful',
    nameRu: 'Красота',
    type: 'merit',
    dots: [2, 4],
    category: 'Looks',
    categoryRu: CAT.Looks,
    descriptionRu: 'Исключительная внешность. +1 кубик к социальным броскам где внешность играет роль (2 точки) или +2 кубика (4 точки).',
  },
  {
    name: 'Blush of Life',
    nameRu: 'Румянец жизни',
    type: 'merit',
    dots: [1, 2],
    category: 'Looks',
    categoryRu: CAT.Looks,
    descriptionRu: 'Вампир выглядит живым — тёплая кожа, розовые щёки. Требует Rouse Check для поддержания. Снижает риск раскрытия Маскарада.',
  },
  {
    name: 'Lifelike',
    nameRu: 'Живоподобный',
    type: 'merit',
    dots: 3,
    category: 'Looks',
    categoryRu: CAT.Looks,
    descriptionRu: 'Вампир практически неотличим от живого без медицинского обследования. +3 к броскам на Маскарад среди смертных.',
  },

  // ── Мифические ───────────────────────────────────────────
  {
    name: 'True Love',
    nameRu: 'Истинная любовь',
    type: 'merit',
    dots: 1,
    category: 'Mythical',
    categoryRu: CAT.Mythical,
    descriptionRu: 'Есть смертный или вампир, которого персонаж любит по-настоящему. Раз в сессию: провальная проверка Воли становится успехом ради защиты любимого.',
  },

  // ── Тонкокровные ─────────────────────────────────────────
  {
    name: 'Day Drinker',
    nameRu: 'Дневной пьяница',
    type: 'merit',
    dots: 2,
    category: 'Thin-Blood',
    categoryRu: CAT['Thin-Blood'],
    descriptionRu: 'Тонкокровный выдерживает дневной свет. Солнце наносит вдвое меньше урона, вампирские способности в дневное время подавлены наполовину.',
    clanRestriction: ['Thin-Blood'],
  },
  {
    name: 'Catenating Blood',
    nameRu: 'Связующая кровь',
    type: 'merit',
    dots: 1,
    category: 'Thin-Blood',
    categoryRu: CAT['Thin-Blood'],
    descriptionRu: 'Тонкокровный может создавать Кровные Связи и совершать Объятие — хотя результат непредсказуем.',
    clanRestriction: ['Thin-Blood'],
  },
  {
    name: 'Thin-Blood Alchemist',
    nameRu: 'Алхимик тонкой крови',
    type: 'merit',
    dots: 1,
    category: 'Thin-Blood',
    categoryRu: CAT['Thin-Blood'],
    descriptionRu: 'Открывает доступ к Алхимии Тонкой Крови. Даёт одну начальную формулу первого уровня.',
    clanRestriction: ['Thin-Blood'],
  },
]

// ─── НЕДОСТАТКИ ──────────────────────────────────────────────

export const FLAWS: MeritFlaw[] = [
  // ── Врождённые ───────────────────────────────────────────
  {
    name: 'Addiction',
    nameRu: 'Зависимость',
    type: 'flaw',
    dots: [1, 2],
    category: 'Feeding',
    categoryRu: CAT.Feeding,
    descriptionRu: 'Вампир одержим определённым типом крови или ощущений (наркоманы, алкоголики, верующие). Без этой крови он теряет часть Воли.',
  },
  {
    name: 'Bestial',
    nameRu: 'Звероподобный',
    type: 'flaw',
    dots: 2,
    category: 'Innate',
    categoryRu: CAT.Innate,
    descriptionRu: 'Зверь близко к поверхности. –1 к броскам на сопротивление Френзи.',
  },
  {
    name: 'Flaw: Adversarial Upbringing',
    nameRu: 'Враждебное воспитание',
    type: 'flaw',
    dots: 1,
    category: 'Psychological',
    categoryRu: CAT.Psychological,
    descriptionRu: 'Прошлое вампира делает его нетерпимым или жестоким. –1 к социальным броскам с теми, кого он не уважает.',
  },
  {
    name: 'Compromised',
    nameRu: 'Скомпрометированный',
    type: 'flaw',
    dots: 2,
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Враги или конкуренты знают о слабостях персонажа. +2 кубика противникам при попытке проникнуть в его логово или планы.',
  },
  {
    name: 'Dark Secret',
    nameRu: 'Тёмная тайна',
    type: 'flaw',
    dots: [1, 2],
    category: 'Psychological',
    categoryRu: CAT.Psychological,
    descriptionRu: 'У персонажа есть тайна, которая может уничтожить его репутацию или хуже. Рассказчик может использовать её в любой момент.',
  },
  {
    name: 'Discriminatory Taste',
    nameRu: 'Особый вкус',
    type: 'flaw',
    dots: 1,
    category: 'Feeding',
    categoryRu: CAT.Feeding,
    descriptionRu: 'Вампир может питаться только от строго определённого типа людей — более ограниченно, чем кланный порок Вентру.',
  },
  {
    name: 'Enemy',
    nameRu: 'Враг',
    type: 'flaw',
    dots: [1, 2, 3],
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Опасный противник активно желает гибели персонажа. Мощь врага растёт с количеством точек.',
  },
  {
    name: 'Frenzy Prone',
    nameRu: 'Склонность к Френзи',
    type: 'flaw',
    dots: [1, 2],
    category: 'Psychological',
    categoryRu: CAT.Psychological,
    descriptionRu: 'Проверки на сопротивление Ярости или Голода получают штраф –1 (1 точка) или –2 (2 точки).',
  },
  {
    name: 'Haunted',
    nameRu: 'Проклятый',
    type: 'flaw',
    dots: 1,
    category: 'Haven',
    categoryRu: CAT.Haven,
    descriptionRu: 'Логово или присутствие персонажа привлекает духов или враждебную сверхъестественную активность.',
  },
  {
    name: 'Infertile Vitae',
    nameRu: 'Бесплодное витэ',
    type: 'flaw',
    dots: 3,
    category: 'Mythical',
    categoryRu: CAT.Mythical,
    descriptionRu: 'Вампир не может создавать гулей или совершать Объятие — его кровь не несёт вампирских свойств для других.',
  },
  {
    name: 'Known Blankbody',
    nameRu: 'Известный вампир',
    type: 'flaw',
    dots: [2, 3],
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Второй Инквизиции известно о существовании этого вампира. Они активно за ним охотятся.',
  },
  {
    name: 'Loud Dreamer',
    nameRu: 'Беспокойный сон',
    type: 'flaw',
    dots: 1,
    category: 'Innate',
    categoryRu: CAT.Innate,
    descriptionRu: 'Вампир стонет, движется или говорит во время дневного сна, что может выдать его присутствие.',
  },
  {
    name: 'Obvious Predator',
    nameRu: 'Очевидный хищник',
    type: 'flaw',
    dots: 2,
    category: 'Looks',
    categoryRu: CAT.Looks,
    descriptionRu: 'Что-то в облике или поведении персонажа пугает людей инстинктивно. –2 к большинству социальных броскам с незнакомыми людьми.',
  },
  {
    name: 'Probationary Member',
    nameRu: 'Испытательный срок',
    type: 'flaw',
    dots: 1,
    category: 'Influence',
    categoryRu: CAT.Influence,
    descriptionRu: 'Персонаж — новичок в секте на испытательном сроке. Статус ограничен, некоторые ресурсы недоступны.',
  },
  {
    name: 'Repelled by Faith',
    nameRu: 'Отталкиваемый верой',
    type: 'flaw',
    dots: 2,
    category: 'Mythical',
    categoryRu: CAT.Mythical,
    descriptionRu: 'Искренняя вера отталкивает вампира физически. Он не может пересекать освящённые места без проверки Воли.',
  },
  {
    name: 'Stake Bait',
    nameRu: 'Лёгкая добыча',
    type: 'flaw',
    dots: 2,
    category: 'Innate',
    categoryRu: CAT.Innate,
    descriptionRu: 'Для посадки на кол вампиру достаточно попадания в грудь, а не именно в сердце.',
  },
  {
    name: 'Stigmata',
    nameRu: 'Стигматы',
    type: 'flaw',
    dots: 2,
    category: 'Looks',
    categoryRu: CAT.Looks,
    descriptionRu: 'В стрессовых ситуациях у вампира появляются стигматы — кровоточащие раны, которые выдают его сверхъестественную природу.',
  },
  {
    name: 'Vulnerable to Folk Magic',
    nameRu: 'Уязвим к народной магии',
    type: 'flaw',
    dots: 1,
    category: 'Mythical',
    categoryRu: CAT.Mythical,
    descriptionRu: 'Старые суеверия работают против этого вампира: чеснок причиняет дискомфорт, соль задерживает. Рассказчик решает детали.',
  },

  // ── Тонкокровные ─────────────────────────────────────────
  {
    name: 'Dead Flesh',
    nameRu: 'Мёртвая плоть',
    type: 'flaw',
    dots: 1,
    category: 'Thin-Blood',
    categoryRu: CAT['Thin-Blood'],
    descriptionRu: 'Кожа тонкокровного имеет зеленоватый оттенок и запах разложения. –1 к социальным броскам с незнакомыми смертными.',
    clanRestriction: ['Thin-Blood'],
  },
  {
    name: 'Mortal Frailty',
    nameRu: 'Смертная слабость',
    type: 'flaw',
    dots: 1,
    category: 'Thin-Blood',
    categoryRu: CAT['Thin-Blood'],
    descriptionRu: 'Тонкокровный восстанавливается как смертный — раны заживают днями, а не с Rouse Check.',
    clanRestriction: ['Thin-Blood'],
  },
  {
    name: 'Vitae Dependency',
    nameRu: 'Зависимость от витэ',
    type: 'flaw',
    dots: 1,
    category: 'Thin-Blood',
    categoryRu: CAT['Thin-Blood'],
    descriptionRu: 'Если тонкокровный не пьёт кровь раз в неделю, он теряет способность использовать Дисциплины до следующего кормления.',
    clanRestriction: ['Thin-Blood'],
  },
]

// ─── Helpers ─────────────────────────────────────────────────

export const ALL_MERITS_FLAWS = [...MERITS, ...FLAWS]

export const getMeritsByCategory = (category: MeritFlawCategory) =>
  MERITS.filter(m => m.category === category)

export const getFlawsByCategory = (category: MeritFlawCategory) =>
  FLAWS.filter(f => f.category === category)

export const getMeritsFlawsForClan = (clanName: string) =>
  ALL_MERITS_FLAWS.filter(
    mf => !mf.clanRestriction || mf.clanRestriction.includes(clanName)
  )

export const MERIT_FLAW_CATEGORIES: { value: MeritFlawCategory; label: string }[] = [
  { value: 'Innate', label: CAT.Innate },
  { value: 'Feeding', label: CAT.Feeding },
  { value: 'Haven', label: CAT.Haven },
  { value: 'Herd', label: CAT.Herd },
  { value: 'Influence', label: CAT.Influence },
  { value: 'Looks', label: CAT.Looks },
  { value: 'Mythical', label: CAT.Mythical },
  { value: 'Psychological', label: CAT.Psychological },
  { value: 'Thin-Blood', label: CAT['Thin-Blood'] },
]
