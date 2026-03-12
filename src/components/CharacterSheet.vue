<script setup lang="ts">
import { ref } from 'vue'
import { useCharacterSheet } from '@/composables/useCharacterSheet'
import ClanSelector from '@/components/ClanSelector.vue'
import AttributeSkillGrid from '@/components/AttributeSkillGrid.vue'
import DisciplinePanel from '@/components/DisciplinePanel.vue'
import MeritFlawPicker from '@/components/MeritFlawPicker.vue'
import VampireStatusBar from '@/components/VampireStatusBar.vue'
import type { Attribute, Skill, ClanName } from '@/types/vtm.types'
import { SECTS, PREDATOR_TYPES, GENERATIONS } from '@/data/rules.data'

// ============================================================
// CharacterSheet.vue — главный лист персонажа VtM V5
// Объединяет все компоненты через useCharacterSheet
// ============================================================

const {
  sheet,
  selectedClan,
  bloodPotencyData,
  maxHealth,
  maxWillpower,
  setClan,
  setAttribute,
  setSkill,
  resetSheet,
  exportSheet,
  importSheet,
} = useCharacterSheet()

const activeSection = ref<'identity' | 'attributes' | 'disciplines' | 'merits' | 'status' | 'notes'>('identity')

const sections = [
  { key: 'identity',     label: 'Личность' },
  { key: 'attributes',   label: 'Атрибуты' },
  { key: 'disciplines',  label: 'Дисциплины' },
  { key: 'merits',       label: 'Достоинства' },
  { key: 'status',       label: 'Состояние' },
  { key: 'notes',        label: 'Заметки' },
] as const

// Export/Import
const showExport = ref(false)
const exportData = ref('')
const importData = ref('')
const importError = ref(false)

const doExport = () => {
  exportData.value = exportSheet()
  showExport.value = true
}

const doImport = () => {
  const ok = importSheet(importData.value)
  importError.value = !ok
  if (ok) importData.value = ''
}

const copyToClipboard = (text: string) => {
  window.navigator.clipboard?.writeText(text)
}
</script>

<template>
  <div class="character-sheet">

    <!-- Шапка -->
    <header class="sheet-header">
      <div class="header-title">
        <div class="vtm-logo">🩸</div>
        <div>
          <h1 class="sheet-title">Лист персонажа</h1>
          <p class="sheet-subtitle">Vampire: the Masquerade — 5-я редакция</p>
        </div>
      </div>
      <div class="header-actions">
        <button class="action-btn" type="button" @click="doExport">Экспорт</button>
        <button class="action-btn danger" type="button" @click="resetSheet">Сброс</button>
      </div>
    </header>

    <!-- Краткий баннер персонажа -->
    <div class="char-banner">
      <div class="banner-field">
        <label>Имя</label>
        <input v-model="sheet.name" placeholder="Имя персонажа" />
      </div>
      <div class="banner-field">
        <label>Клан</label>
        <span class="banner-value" :style="{ color: selectedClan ? '#c0392b' : '#555' }">
          {{ selectedClan?.nameRu ?? 'Не выбран' }}
        </span>
      </div>
      <div class="banner-field">
        <label>Человечность</label>
        <span class="banner-value">{{ sheet.humanity }}/10</span>
      </div>
      <div class="banner-field">
        <label>Голод</label>
        <span class="banner-value hunger-val">{{ sheet.hunger }}/5</span>
      </div>
    </div>

    <!-- Навигация -->
    <nav class="section-nav">
      <button
        v-for="s in sections"
        :key="s.key"
        class="nav-btn"
        :class="{ active: activeSection === s.key }"
        type="button"
        @click="activeSection = s.key"
      >{{ s.label }}</button>
    </nav>

    <!-- Контент секций -->
    <main class="sheet-main">

      <!-- ─── Личность ─────────────────────────────────────── -->
      <section v-show="activeSection === 'identity'" class="section-content">
        <h2 class="section-heading">Личность</h2>

        <div class="form-grid">
          <div class="form-field">
            <label>Имя персонажа</label>
            <input v-model="sheet.name" placeholder="Имя" />
          </div>
          <div class="form-field">
            <label>Игрок</label>
            <input v-model="sheet.player" placeholder="Ваше имя" />
          </div>
          <div class="form-field">
            <label>Хроника</label>
            <input v-model="sheet.chronicle" placeholder="Название хроники" />
          </div>
          <div class="form-field">
            <label>Концепция</label>
            <input v-model="sheet.concept" placeholder="Кто ваш персонаж?" />
          </div>
          <div class="form-field">
            <label>Сир</label>
            <input v-model="sheet.sire" placeholder="Имя сира" />
          </div>
          <div class="form-field">
            <label>Поколение</label>
            <select v-model="sheet.generation">
              <option v-for="g in GENERATIONS" :key="g.value" :value="g.value">
                {{ g.label }}
              </option>
            </select>
          </div>
          <div class="form-field">
            <label>Секта</label>
            <select v-model="sheet.sect">
              <option :value="null">— не выбрана —</option>
              <option v-for="s in SECTS" :key="s.value" :value="s.value">
                {{ s.label }}
              </option>
            </select>
          </div>
          <div class="form-field">
            <label>Тип охоты</label>
            <select v-model="sheet.predatorType">
              <option :value="null">— не выбран —</option>
              <option v-for="pt in PREDATOR_TYPES" :key="pt.name" :value="pt.name">
                {{ pt.nameRu }}
              </option>
            </select>
          </div>
          <div class="form-field">
            <label>Амбиция</label>
            <input v-model="sheet.ambition" placeholder="Долгосрочная цель" />
          </div>
          <div class="form-field">
            <label>Желание</label>
            <input v-model="sheet.desire" placeholder="Краткосрочное желание" />
          </div>
        </div>

        <h2 class="section-heading" style="margin-top: 2rem;">Выбор клана</h2>
        <ClanSelector
          :model-value="sheet.clan"
          @update:model-value="setClan($event as ClanName | null)"
        />
      </section>

      <!-- ─── Атрибуты и Навыки ────────────────────────────── -->
      <section v-show="activeSection === 'attributes'" class="section-content">
        <h2 class="section-heading">Атрибуты и Навыки</h2>
        <AttributeSkillGrid
          :attributes="sheet.attributes"
          :skills="sheet.skills"
          @update:attributes="v => Object.assign(sheet.attributes, v)"
          @update:skills="v => Object.assign(sheet.skills, v)"
        />
      </section>

      <!-- ─── Дисциплины ───────────────────────────────────── -->
      <section v-show="activeSection === 'disciplines'" class="section-content">
        <h2 class="section-heading">Дисциплины</h2>
        <div v-if="!sheet.clan" class="no-clan-hint">
          ← Сначала выберите клан на вкладке «Личность»
        </div>
        <DisciplinePanel
          v-else
          :disciplines="sheet.disciplines"
          @update:disciplines="sheet.disciplines = $event"
        />
      </section>

      <!-- ─── Достоинства и Недостатки ────────────────────── -->
      <section v-show="activeSection === 'merits'" class="section-content">
        <h2 class="section-heading">Достоинства и Недостатки</h2>
        <MeritFlawPicker
          :selected-merits="sheet.advantages"
          :selected-flaws="sheet.flaws"
          :clan-name="sheet.clan"
          @update:selected-merits="sheet.advantages = $event"
          @update:selected-flaws="sheet.flaws = $event"
        />
      </section>

      <!-- ─── Состояние ────────────────────────────────────── -->
      <section v-show="activeSection === 'status'" class="section-content">
        <h2 class="section-heading">Состояние вампира</h2>
        <VampireStatusBar
          :hunger="sheet.hunger"
          :humanity="sheet.humanity"
          :blood-potency="sheet.bloodPotency"
          :health="maxHealth"
          :max-health="maxHealth"
          :health-damage="sheet.healthDamage"
          :willpower="maxWillpower"
          :max-willpower="maxWillpower"
          :willpower-damage="sheet.willpowerDamage"
          @update:hunger="sheet.hunger = $event"
          @update:humanity="sheet.humanity = $event"
          @update:blood-potency="sheet.bloodPotency = $event"
          @update:health-damage="sheet.healthDamage = $event"
          @update:willpower-damage="sheet.willpowerDamage = $event"
        />
      </section>

      <!-- ─── Заметки ──────────────────────────────────────── -->
      <section v-show="activeSection === 'notes'" class="section-content">
        <h2 class="section-heading">Заметки</h2>
        <div class="form-grid">
          <div class="form-field wide">
            <label>Убеждения (Convictions)</label>
            <textarea v-model="sheet.convictions[0]" rows="3" placeholder="Моральные принципы персонажа..." />
          </div>
          <div class="form-field wide">
            <label>Точки опоры (Touchstones)</label>
            <textarea v-model="sheet.touchstones[0]" rows="2" placeholder="Люди, напоминающие о человечности..." />
          </div>
          <div class="form-field">
            <label>Резонанс крови</label>
            <input v-model="sheet.resonance" placeholder="Холерический, Меланхолический..." />
          </div>
          <div class="form-field">
            <label>Опыт (XP)</label>
            <div style="display: flex; gap: 0.5rem;">
              <input v-model.number="sheet.experience" type="number" min="0" placeholder="Текущий" />
              <input v-model.number="sheet.totalExperience" type="number" min="0" placeholder="Всего" />
            </div>
          </div>
          <div class="form-field wide">
            <label>Хроника / Заметки</label>
            <textarea v-model="sheet.notes" rows="5" placeholder="Заметки рассказчика, история персонажа..." />
          </div>
        </div>

        <!-- Import -->
        <div class="import-block">
          <h3 class="section-heading">Импорт JSON</h3>
          <textarea
            v-model="importData"
            rows="4"
            placeholder="Вставьте JSON листа персонажа..."
            :class="{ error: importError }"
          />
          <button class="action-btn" type="button" @click="doImport">Импортировать</button>
          <span v-if="importError" class="error-msg">Ошибка парсинга JSON</span>
        </div>
      </section>

    </main>

    <!-- Модал экспорта -->
    <div v-if="showExport" class="modal-overlay" @click.self="showExport = false">
      <div class="modal">
        <h3 class="modal-title">Экспорт персонажа</h3>
        <textarea readonly :value="exportData" rows="12" class="export-area" />
        <div class="modal-actions">
          <button class="action-btn" type="button" @click="copyToClipboard(exportData)">
            Копировать
          </button>
          <button class="action-btn" type="button" @click="showExport = false">Закрыть</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
* { box-sizing: border-box; }

.character-sheet {
  min-height: 100vh;
  background: #0d0d0d;
  color: #ccc;
  font-family: 'Georgia', serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

/* HEADER */
.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2a2a2a;
}

.header-title { display: flex; align-items: center; gap: 0.75rem; }
.vtm-logo { font-size: 2rem; }
.sheet-title { font-size: 1.4rem; font-weight: 700; color: #fff; margin: 0; }
.sheet-subtitle { font-size: 0.78rem; color: #555; margin: 0; }

.header-actions { display: flex; gap: 0.5rem; }

.action-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid #444;
  border-radius: 5px;
  background: #1a1a1a;
  color: #bbb;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.15s;
}

.action-btn:hover { border-color: #8b0000; color: #fff; }
.action-btn.danger:hover { border-color: #c0392b; background: rgba(192,57,43,0.1); }

/* BANNER */
.char-banner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  background: #111;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
}

@media (max-width: 600px) {
  .char-banner { grid-template-columns: repeat(2, 1fr); }
}

.banner-field { display: flex; flex-direction: column; }
.banner-field label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: #555; }
.banner-value { font-size: 1rem; font-weight: 600; color: #ddd; }
.hunger-val { color: #c0392b; }

/* NAV */
.section-nav {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 0.4rem 0.9rem;
  border: 1px solid #222;
  border-radius: 5px;
  background: transparent;
  color: #666;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.15s;
  font-family: inherit;
}

.nav-btn:hover { color: #bbb; border-color: #444; }
.nav-btn.active { border-color: #8b0000; background: rgba(139,0,0,0.15); color: #fff; }

/* MAIN */
.section-content { display: flex; flex-direction: column; gap: 1rem; }

.section-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #8b0000;
  margin: 0 0 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #2a2a2a;
}

/* FORMS */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 600px) {
  .form-grid { grid-template-columns: 1fr; }
}

.form-field { display: flex; flex-direction: column; gap: 0.3rem; }
.form-field.wide { grid-column: 1 / -1; }

.form-field label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #555;
}

.form-field input,
.form-field select,
.form-field textarea {
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 5px;
  color: #ddd;
  padding: 0.5rem 0.6rem;
  font-size: 0.88rem;
  font-family: inherit;
  transition: border-color 0.15s;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: #555;
}

.form-field textarea { resize: vertical; }

/* HINTS */
.no-clan-hint {
  color: #555;
  font-size: 0.9rem;
  padding: 2rem;
  border: 1px dashed #333;
  border-radius: 8px;
  text-align: center;
}

/* IMPORT */
.import-block { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }

.import-block textarea {
  background: #111;
  border: 1px solid #333;
  border-radius: 5px;
  color: #ddd;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-family: monospace;
}

.import-block textarea.error { border-color: #c0392b; }
.error-msg { color: #e74c3c; font-size: 0.8rem; }

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
}

.modal {
  background: #141414;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1.5rem;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modal-title { font-size: 1rem; color: #fff; margin: 0; }

.export-area {
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 5px;
  color: #aaa;
  padding: 0.75rem;
  font-family: monospace;
  font-size: 0.78rem;
  resize: none;
  width: 100%;
}

.modal-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
</style>
