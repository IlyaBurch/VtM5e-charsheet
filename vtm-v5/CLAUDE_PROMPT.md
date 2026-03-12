# Задача для Claude Code — интеграция VtM V5 в Vue 3 проект

## Контекст
Я разрабатываю интерактивный лист персонажа для НРИ **Vampire: the Masquerade 5-я редакция** на **Vue 3 + Vite + TypeScript**.

В папке `vtm-v5/` лежат готовые файлы которые нужно интегрировать в проект.

---

## Структура готовых файлов

```
vtm-v5/
├── types/
│   └── vtm.types.ts          # Все TypeScript типы (Clan, CharacterSheet, Discipline и др.)
├── data/
│   ├── clans.data.ts         # 15 кланов с Дисциплинами, Пороком, Компульсией (RU)
│   ├── disciplines.data.ts   # 11 Дисциплин с силами 1-5 уровня (RU)
│   ├── merits-flaws.data.ts  # Достоинства и Недостатки с категориями (RU)
│   └── rules.data.ts         # Атрибуты, Навыки, Типы охоты, Blood Potency, Резонансы (RU)
├── composables/
│   └── useCharacterSheet.ts  # Реактивный composable листа персонажа
└── components/
    ├── CharacterSheet.vue    # Главный компонент — собирает всё вместе
    ├── ClanSelector.vue      # Выбор клана с превью (цвета, Дисциплины, Порок)
    ├── DisciplinePanel.vue   # Панель Дисциплин с точками и силами
    ├── AttributeSkillGrid.vue # Сетка атрибутов и навыков
    ├── MeritFlawPicker.vue   # Выбор Достоинств/Недостатков с фильтрами
    └── VampireStatusBar.vue  # Голод, Человечность, Blood Potency, трекеры урона
```

---

## Что нужно сделать

1. **Изучи структуру проекта** — посмотри `src/`, `package.json`, `tsconfig.json`, `vite.config.ts`

2. **Определи куда класть файлы** исходя из структуры проекта:
   - Если есть `src/types/` → туда `vtm.types.ts`
   - Если есть `src/composables/` → туда `useCharacterSheet.ts`
   - Если есть `src/components/` → туда все `.vue` файлы
   - Если есть `src/data/` или `src/assets/data/` → туда data-файлы
   - Если таких папок нет — создай их по стандарту Vue 3

3. **Скопируй файлы** в правильные места

4. **Исправь импорты** во всех файлах — пути `../types/vtm.types`, `../data/clans.data` и т.д. должны соответствовать реальной структуре после переноса

5. **Подключи главный компонент** `CharacterSheet.vue`:
   - Если есть роутер (`vue-router`) — добавь маршрут `/character` или `/sheet`
   - Если нет роутера — импортируй `CharacterSheet.vue` прямо в `App.vue`

6. **Проверь зависимости** — все компоненты используют только Vue 3 (ref, computed, watch), никаких внешних UI-библиотек не требуется

7. **Запусти** `npm run type-check` или `vue-tsc --noEmit` и исправь ошибки типов если есть

---

## Важные детали

- Все компоненты используют `<script setup lang="ts">` — Composition API
- Стили написаны через `<style scoped>` с CSS переменными, никакого Tailwind
- `useCharacterSheet` — singleton composable, его можно обернуть в Pinia store если нужно
- Данные полностью на русском языке, названия типов на английском

---

## После интеграции покажи

- Итоговую структуру файлов куда всё легло
- Какие импорты были изменены
- Как подключить `CharacterSheet.vue` в проект
