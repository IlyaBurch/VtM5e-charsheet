# Cainite.ru — Design Specification
> Передай этот файл Claude Code. Он содержит полную дизайн-систему, CSS-токены, описание всех страниц и компонентов.

---

## Стек

- Vue 3 + `<script setup>` + TypeScript
- Vite
- Без UI-библиотек — всё кастомное
- Шрифты через Google Fonts (подключить в `index.html`)

---

## Шрифты

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Jost:wght@200;300;400;500&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Special+Elite&display=swap" rel="stylesheet">
```

| Роль | Шрифт |
|------|-------|
| Логотип, заголовки-гиганты, числа | `'Bebas Neue', sans-serif` |
| UI, навигация, лейблы, кнопки | `'Jost', sans-serif` |
| Имена персонажей VtM | `'Cormorant Garamond', serif` (italic 300) |
| Имена персонажей Mork Borg, значения | `'Special Elite', cursive` |

---

## CSS-токены (глобальные CSS-переменные)

Объявить на `:root`.

```css
:root {
  --bg:        #080808;
  --bg2:       #040404;
  --bg3:       #0c0c0c;
  --sb-bg:     #030303;
  --b:         #151515;
  --b2:        #111111;
  --red:       #ad0013;
  --gold:      #a67d43;
  --gold-dim:  #6a4e28;
  --t1:        #e8e8e8;
  --t2:        #b0b0b0;
  --t3:        #888888;
  --lbl:       #999999;
  --font-head: 'Bebas Neue', sans-serif;
  --font-body: 'Jost', sans-serif;
  --font-char: 'Cormorant Garamond', serif;
  --font-mb:   'Special Elite', cursive;
}

/* Mork Borg theme — добавить класс .mork на <body> или layout */
.mork {
  --bg:        #0e0d00;
  --bg2:       #090900;
  --bg3:       #0b0a00;
  --sb-bg:     #0a0900;
  --b:         #2a2800;
  --b2:        #1e1c00;
  --red:       #ffee12;
  --gold:      #ffee12;
  --gold-dim:  #888800;
  --t1:        #f5f5f5;
  --t2:        #cccc00;
  --t3:        #777700;
  --lbl:       #888800;
}
```

---

## Роуты

```
/                     → HomePage (лендинг)
/auth                 → AuthPage (вход / регистрация / сброс пароля)
/characters           → CharacterListPage (список персонажей системы)
/characters/:id       → CharacterSheetPage (лист персонажа)
/characters/new       → CharacterNewPage (создание)
```

---

## Pinia: useSystemStore

```ts
type SystemId = 'vtm' | 'mork' | 'coc'

const SYSTEMS = [
  { id: 'vtm',  name: 'Vampire: The Masquerade 5e', short: 'VtM 5e',    accent: '#ad0013', theme: 'dark' },
  { id: 'mork', name: 'Mork Borg',                  short: 'Mörk Borg', accent: '#ffee12', theme: 'mork' },
  { id: 'coc',  name: 'Call of Cthulhu',             short: 'CoC',       accent: '#4a7a9b', theme: 'dark' },
]

// При смене системы:
// 1. Добавить/убрать класс .mork на document.body
// 2. Перейти на /characters
```

---

## AppLayout (десктоп ≥ 1024px)

```
┌──────────────────────────────────────────────────────┐
│ Sidebar 200px      │ Content flex:1                  │
│ bg: var(--sb-bg)   │ bg: var(--bg)                   │
│ border-right: var(--b)                               │
│                    │ [mb-strip — только .mork]        │
│ CAINITE (logo)     │                                 │
│ VtM 5e · Лист      │ <router-view />                 │
│ ──────────────     │                                 │
│ nav items          │                                 │
│ ──────────────     │                                 │
│ Системы:           │                                 │
│ ● VtM 5e           │                                 │
│ ○ Mork Borg        │                                 │
│ ○ CoC              │                                 │
│ ──────────────     │                                 │
│ [Экспорт][Выйти]   │                                 │
└──────────────────────────────────────────────────────┘
```

### Sidebar CSS

```css
.sidebar {
  width: 200px; flex-shrink: 0;
  background: var(--sb-bg);
  border-right: 1px solid var(--b);
  display: flex; flex-direction: column; overflow: hidden;
  transition: background 0.4s, border-color 0.4s;
}
.sb-logo {
  font-family: var(--font-head);
  font-size: 17px; letter-spacing: 5px; color: #fff;
  transition: color 0.4s;
}
.mork .sb-logo { color: var(--gold); letter-spacing: 3px; }

.sb-nav-item {
  padding: 8px 16px; font-size: 9px; color: var(--t3);
  letter-spacing: 2px; text-transform: uppercase;
  cursor: pointer; border-left: 2px solid transparent;
  transition: all 0.15s;
}
.sb-nav-item.active {
  color: var(--t1); background: var(--bg);
  border-left-color: var(--gold);
}

/* Кнопки — маленькие, в ряд */
.sb-auth { padding: 8px 14px; border-top: 1px solid var(--b2); display: flex; gap: 6px; }
.sb-btn {
  flex: 1; background: transparent; border: 1px solid var(--b);
  color: var(--t3); font-family: var(--font-body);
  font-size: 8px; letter-spacing: 1px; text-transform: uppercase;
  padding: 4px 6px; cursor: pointer; transition: all 0.2s;
}
.sb-btn:hover { border-color: var(--gold-dim); color: var(--gold); }

/* Mork Borg жёлтая полоска */
.mb-strip { height: 3px; background: var(--gold); display: none; }
.mork .mb-strip { display: block; }
```

---

## Мобильный layout (< 1024px)

```css
/* Шапка сайта */
.site-hdr {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 14px; border-bottom: 1px solid var(--b);
  background: #030303; flex-shrink: 0;
}
.site-logo { font-family: var(--font-head); font-size: 16px; letter-spacing: 5px; color: #fff; }

/* Переключатель систем */
.sys-pill {
  font-size: 8px; color: var(--t3); letter-spacing: 1px;
  text-transform: uppercase; padding: 5px 10px;
  cursor: pointer; border-bottom: 2px solid transparent; white-space: nowrap;
}
.sys-pill.active { color: var(--red); border-bottom-color: var(--red); }

/* Табы чарника */
.char-tabs { display: flex; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid var(--b); background: var(--bg2); }
.char-tabs::-webkit-scrollbar { display: none; }
.char-tab {
  flex-shrink: 0; padding: 9px 12px; font-size: 8px; color: var(--t3);
  letter-spacing: 2px; text-transform: uppercase;
  border-bottom: 2px solid transparent; cursor: pointer;
}
.char-tab.active { color: var(--t1); border-bottom-color: var(--red); }
```

**Горизонтальный режим телефона:**
- Баннер персонажа схлопывается в одну строку: `имя | клан | голод`
- Статусные точки (здоровье/воля/человечность) уходят во вкладку "Состояние"

---

## Section Label (заголовок раздела)

```css
.section-label {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 20px; background: var(--bg2);
  border-bottom: 1px solid var(--b2);
  font-size: 8px; color: var(--gold);
  letter-spacing: 3px; text-transform: uppercase;
  transition: color 0.35s, background 0.35s;
}
.section-label::before {
  content: ''; display: block; width: 12px; height: 1px;
  background: var(--gold); flex-shrink: 0; transition: background 0.35s;
}
```

---

## Dot component (точка атрибута/статуса)

```css
.dot {
  width: 12px; height: 12px; border-radius: 50%;
  border: 1px solid #2a2a2a; background: transparent;
  flex-shrink: 0; position: relative; display: inline-block;
}
.dot.filled      { background: #777; border-color: #888; }
.dot.superficial { border-color: #444; }
.dot.superficial::after { content: '/'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #555; line-height: 1; }
.dot.aggravated  { border-color: var(--red); }
.dot.aggravated::after  { content: '×'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 8px; color: var(--red); line-height: 1; }
.dot.hunger      { border-color: #2a0808; }
.dot.hunger-on   { background: #ad0013; border-color: #6a0008; }
```

---

## Field component

```css
/* Лейбл — читаемый (#999 на тёмном фоне) */
.field-label {
  font-size: 9px; color: var(--lbl);
  letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 5px; display: block;
}

/* Значение в чарнике (просмотр) */
.field-value { font-size: 14px; color: var(--t2); font-weight: 300; }
.field-value.primary { color: var(--t1); }

/* Input в чарнике (редактирование) */
.field-input {
  background: transparent; border: none;
  border-bottom: 1px solid var(--b); color: var(--t1);
  font-family: var(--font-body); font-size: 14px; font-weight: 300;
  padding: 8px 0 6px; outline: none; width: 100%;
  transition: border-color 0.2s;
}
.field-input::placeholder { color: var(--t3); }
.field-input:focus { border-bottom-color: var(--t3); }

/* Input на странице авторизации (с полной рамкой) */
.auth-input {
  background: var(--bg); border: 1px solid #1e1e1e; color: var(--t1);
  font-family: var(--font-body); font-size: 14px; font-weight: 300;
  padding: 10px 14px; outline: none; width: 100%;
  transition: border-color 0.2s;
}
.auth-input::placeholder { color: #2a2a2a; }
.auth-input:focus { border-color: #555; }
.auth-input.error { border-color: var(--red); }
```

---

## AuthPage (`/auth`)

Три режима: `login | register | reset`. Переключаются табами или ссылками.

```
[Фоновый ghost-текст "CAINITE" — Bebas Neue, контурный #111]
[Вертикальные grid-линии — #141414, opacity 0.6]
[Красный акцент top-right: ширина 140px height 2px]

[NAV: CAINITE logo | ← На главную]

[CENTER flex, карточка max-width 360px]
  bg: var(--bg2), border: 1px solid var(--b)

  [Табы: Вход | Регистрация]
    active tab: border-bottom 2px solid var(--red), color var(--t1)

  [Тело формы padding 24px]

  LOGIN поля:
    - Email (label + auth-input type=email)
    - Пароль (label + auth-input type=password)
    - ссылка "Забыл пароль?" text-align right, color var(--t3)
    - [Кнопка "Войти"]
    - [Разделитель "или"]
    - [Кнопка "Войти через Google"]

  REGISTER поля:
    - Имя пользователя (label + auth-input) + hint "Будет видно другим игрокам"
    - Email (label + auth-input)
    - Пароль (label + auth-input) + hint "Минимум 8 символов"
    - Повтор пароля (label + auth-input)
    - [Кнопка "Создать аккаунт"]
    - [Разделитель "или"]
    - [Кнопка "Войти через Google"]

  RESET поля:
    - Заголовок "Сброс пароля" (Bebas Neue 22px)
    - Подпись 12px цвет var(--t3)
    - Email (label + auth-input)
    - [Кнопка "Отправить ссылку"]

  [Footer карточки: текст + ссылка переключения режима]
```

```css
.auth-submit {
  width: 100%; background: var(--red); color: #fff; border: none;
  font-family: var(--font-body); font-size: 10px;
  letter-spacing: 3px; text-transform: uppercase;
  padding: 13px; cursor: pointer; margin-top: 20px;
  transition: background 0.2s;
}
.auth-submit:hover { background: #8a000f; }

.auth-oauth {
  width: 100%; background: transparent; border: 1px solid var(--b);
  color: var(--t3); font-family: var(--font-body); font-size: 10px;
  letter-spacing: 2px; text-transform: uppercase; padding: 10px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.2s;
}
.auth-oauth:hover { border-color: var(--t3); color: var(--t2); }

.auth-divider { display: flex; align-items: center; gap: 12px; margin: 18px 0; }
.auth-divider-line { flex: 1; height: 1px; background: var(--b); }
.auth-divider-txt { font-size: 9px; color: #2a2a2a; letter-spacing: 2px; text-transform: uppercase; }
```

---

## CharacterListPage (`/characters`)

```
[Хедер: название системы + кнопка "+ Новый персонаж"]
[Список персонажей]
  каждый элемент: vertical dot (3px, цвет акцента системы) | имя | мета | стрелка
[Dark Pack Footer]
```

```css
.char-list-item {
  display: flex; align-items: center; gap: 14px;
  padding: 13px 20px; border-bottom: 1px solid var(--b2);
  cursor: pointer; transition: background 0.1s;
}
.char-list-item:hover { background: var(--bg2); }
.char-list-dot { width: 3px; height: 36px; flex-shrink: 0; background: var(--red); }
.char-list-name {
  font-family: var(--font-char); font-size: 19px;
  color: var(--t1); font-style: italic; font-weight: 300;
}
.mork .char-list-name { font-family: var(--font-mb); font-style: normal; font-size: 15px; }
.char-list-meta { font-size: 9px; color: var(--t3); letter-spacing: 1px; margin-top: 2px; }
```

---

## CharacterSheetPage — VtM

### Шапка

```
[← Все персонажи]
[Имя: Cormorant italic 28px #fff] [Клан-бейдж: border gold, color gold]
                                  [Поколение: 8px gold-dim]
Здоровье:    ●●●●●/○○  (dots)
Сила воли:   ●●●●○○    (dots)
Человечность:●●●●●●○○○○ (dots)
[ГОЛОД: ●●○○○ — красные точки, отдельная строка]
```

```css
.char-name-vtm {
  font-family: var(--font-char);
  font-size: 28px; font-style: italic; font-weight: 300; color: #fff;
}
.clan-badge {
  font-size: 9px; color: var(--gold);
  border: 1px solid var(--gold-dim); padding: 3px 8px;
  letter-spacing: 1px; text-transform: uppercase;
}
.status-label {
  font-size: 8px; color: var(--lbl);
  letter-spacing: 2px; text-transform: uppercase;
  width: 100px; flex-shrink: 0;
}
.hunger-label {
  font-size: 8px; color: #8a1020;
  letter-spacing: 2px; text-transform: uppercase;
  width: 100px; flex-shrink: 0;
}
```

### Разделы (навигация: десктоп сайдбар / мобиле табы)

| Раздел | Поля |
|--------|------|
| Личность | Имя, Игрок, Хроника, Концепция, Сир, Поколение, Секта, Тип охоты, Амбиция, Желание; ClanSelector |
| Атрибуты | 9 атрибутов в сетке 3×3 с точками 1-5 |
| Навыки | 3 группы × 6 навыков, точки 0-5, 2-колоночная сетка |
| Дисциплины | Список дисциплин с золотыми точками; Сила крови |
| Достоинства | Достоинства с рейтингом ●; Изъян клана; Опыт (получено / потрачено / остаток) |
| Состояние | Интерактивные точки здоровья/воли/человечности/голода с урон-состояниями |
| Заметки | Убеждения, Точки опоры, Заметки (textarea) |

---

## CharacterSheetPage — Mork Borg

### Шапка

```
[← Все персонажи]
[Имя: Special Elite 22px #ffee12] [Класс-бейдж: border #888800, color #ffee12]
ОЗ: [8] / [12]   ← Special Elite, 36px жёлтый / 20px серый
```

### Один длинный скролл (не табы!)
Навигация в сайдбаре = `scrollIntoView` по якорям.

| Раздел (anchor) | Поля |
|-----------------|------|
| `#char` | Описание, Хладнокровие (РС12 или -д2 ОЗ + лишение сил 1ч), Способности класса (название + описание) |
| `#stats` | Сила / Ловкость / Стойкость / Присутствие — модификатор крупно + сырое значение рядом |
| `#combat` | Оружие ×2 (название + урон + особые), Броня (название + снижение урона -дX), Страдания 1-6 кликабельные |
| `#equip` | Сетка снаряжения 3×3, Серебро (крупная цифра) |
| `#omens` | Знамения (кликабельные ✦, кол-во по классу) |
| `#notes` | Текстовое поле |

```css
/* Характеристики MB */
.mb-stat-cell { background: var(--bg3); padding: 11px 14px; display: flex; align-items: center; justify-content: space-between; }
.mb-stat-mod  { font-family: var(--font-mb); font-size: 26px; color: var(--gold); line-height: 1; }
.mb-stat-raw  { font-size: 11px; color: var(--t3); }

/* Страдания */
.mb-suffering-cell {
  width: 30px; height: 30px; border: 1px solid var(--b2);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mb); font-size: 12px; color: var(--t3); cursor: pointer;
  transition: all 0.15s;
}
.mb-suffering-cell.active { border-color: var(--gold); color: var(--gold); }

/* Знамения */
.mb-omen {
  width: 26px; height: 26px; border: 1px solid var(--gold-dim);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mb); font-size: 13px; color: var(--gold); cursor: pointer;
}
.mb-omen.used { background: var(--gold); color: var(--bg); }

/* Серебро */
.mb-silver-val { font-family: var(--font-mb); font-size: 32px; color: var(--gold); line-height: 1; }
```

---

## Dark Pack Footer component

Обязателен на всех страницах.

```vue
<!-- DarkPackFooter.vue -->
<template>
  <footer class="dp-footer">
    <span class="dp-badge">{{ badge }}</span>
    <span class="dp-copy" v-html="copyHtml" />
    <span class="dp-disclaimer">Неофициальный фан-сайт</span>
  </footer>
</template>
```

**VtM — точный текст (не менять):**
> Portions of the materials are the copyrights and trademarks of Paradox Interactive AB, and are used with permission. All rights reserved. For more information please visit worldofdarkness.com

**VtM — дисклеймер (обязательный):**
> Cainite — неофициальный фан-сайт. Не является официальным материалом World of Darkness или Paradox Interactive.

**Mork Borg:**
> Совместимо с Mörk Borg по лицензии MÖRK BORG Third Party License. Неофициальный фан-проект.

```css
.dp-footer {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 16px; background: var(--sb-bg);
  border-top: 1px solid var(--b2);
  flex-wrap: wrap; flex-shrink: 0;
}
.dp-badge { font-size: 7px; color: var(--gold-dim); border: 1px solid var(--b); padding: 2px 6px; white-space: nowrap; flex-shrink: 0; }
.dp-copy  { font-size: 7px; color: var(--t3); line-height: 1.5; flex: 1; }
.dp-disclaimer { font-size: 7px; color: var(--t3); white-space: nowrap; }
```

---

## Лендинг (HomePage `/`)

```
[NAV]
  bg #030303, border-bottom var(--b)
  left: CAINITE (Bebas Neue 20px, letter-spacing 5px)
  center: статус-бар систем (sys-pill × 3)
  right: кнопка "Войти"

[Фоновые элементы (position: absolute, z-index 0)]
  - ghost-текст "VAMPIRE THE MASQUERADE" — Bebas Neue, color transparent,
    -webkit-text-stroke: 1px #131313, bottom-left, размер ~40% ширины контейнера
  - Вертикальные линии-сетки: 5-6 штук, 1px, gradient transparent→#141414→transparent
  - Красный акцент top-right: 160px×2px горизонтально + 2px×70px вертикально, #ad0013

[HERO: два столбца 1fr 300px, мобиле — стек]

LEFT:
  eyebrow: красная линия 20px + "Настольные RPG · Листы персонажей" (9px, #ad0013, letter-spacing 4px)
  H1: "ТВОИ" + "ПЕРСОНАЖИ" (Bebas Neue clamp(52px,10vw,82px), #fff)
  subtitle: "в одном месте" (Bebas Neue clamp(32px,6vw,48px), #a67d43)
  tagline: 13px var(--t3), border-left 1px var(--b), padding-left 14px, line-height 1.75
  CTA row:
    "Создать персонажа" — bg var(--red), color #fff, 10px letter-spacing 3px uppercase, padding 12px 24px
    "Смотреть системы →" — bg transparent, border 1px var(--b), color var(--t3), border-left: none

RIGHT (превью чарника):
  bg var(--bg2), border-left 1px var(--b)
  header: "Пример листа" (9px var(--t3)) + бейдж "VtM 5e" (8px var(--red) border var(--red))
  имя персонажа: Cormorant italic 24px #b8a080
  поколение: 8px var(--gold-dim)
  клан-бейдж: border var(--gold-dim), color var(--gold)
  мини атрибуты 2×2 (padding 8px, labels 8px var(--lbl))
  дисциплины с золотыми точками
  список систем

[BOTTOM STRIP]
  bg var(--bg2), border-top var(--b2)
  4 ячейки: "01 Система VtM 5e" | "∞ Персонажей Без лимита" | "02 Скоро Mork Borg" | "RU Язык Русский"
  число: Bebas Neue 22px #161616; label: 8px #181818; value: 9px #202020

[DARK PACK FOOTER]
  Дисклеймер-бар (bg #0a0000, border-bottom #1a0808):
    красная точка 5px + текст "Cainite — неофициальный фан-сайт..."
  Footer-row:
    Dark Pack badge | copyright text | ссылки
```

---

## Адаптив — брейкпоинты

| Ширина | Layout |
|--------|--------|
| ≥ 1024px | Постоянный сайдбар, контент справа |
| 768–1023px | Планшет: как мобиле но шире |
| < 768px portrait | Мобиле: топ-хедер + баннер персонажа + горизонтальные табы |
| < 768px landscape | Мобиле горизонт: баннер схлопывается в 1 строку (имя + клан + голод), статус → вкладка |

---

## Цветовые акценты по системам

| Система | Акцент | Тема CSS | Шрифт имён |
|---------|--------|----------|------------|
| VtM 5e | #ad0013 красный + #a67d43 золото | default | Cormorant Garamond italic |
| Mork Borg | #ffee12 кислотный жёлтый | .mork | Special Elite |
| CoC | #4a7a9b синеватый | default | Cormorant Garamond italic |

---

## Правила Dark Pack (критично для продакшна)

1. Логотип Dark Pack на каждой странице с VtM-контентом
2. Точный копирайт-текст без изменений
3. Дисклеймер о неофициальности на каждой странице
4. Сайт полностью бесплатный — никаких платных функций
5. Принимать донаты через Patreon — разрешено
6. Официальные PNG логотипов: `paradoxinteractive.com/games/world-of-darkness/community/dark-pack-agreement`
