<script setup lang="ts">
import { computed } from 'vue'
import type { ClanName } from '../types/vtm.types'
import { CLANS } from '../data/clans.data'

// ============================================================
// ClanSelector.vue — выбор клана с превью
// ============================================================

const props = defineProps<{
  modelValue: ClanName | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ClanName | null]
}>()

const selectedClan = computed(() =>
  props.modelValue ? CLANS.find(c => c.name === props.modelValue) : null
)

const selectClan = (name: ClanName) => {
  emit('update:modelValue', props.modelValue === name ? null : name)
}

// Цвета для кланов
const CLAN_COLORS: Record<string, string> = {
  Brujah:     '#c0392b',
  Gangrel:    '#795548',
  Hecata:     '#4a148c',
  Lasombra:   '#212121',
  Malkavian:  '#1565c0',
  Ministry:   '#e65100',
  Nosferatu:  '#37474f',
  Ravnos:     '#ad1457',
  Salubri:    '#2e7d32',
  Toreador:   '#c2185b',
  Tremere:    '#6a1b9a',
  Tzimisce:   '#4e342e',
  Ventrue:    '#1a237e',
  'Banu Haqim': '#bf360c',
  Caitiff:    '#546e7a',
  'Thin-Blood': '#78909c',
}

const getClanColor = (name: string) => CLAN_COLORS[name] ?? '#555'
</script>

<template>
  <div class="clan-selector">
    <!-- Сетка кланов -->
    <div class="clan-grid">
      <button
        v-for="clan in CLANS"
        :key="clan.name"
        class="clan-btn"
        :class="{ active: modelValue === clan.name }"
        :style="{ '--clan-color': getClanColor(clan.name) }"
        type="button"
        :title="clan.nameRu"
        @click="selectClan(clan.name as ClanName)"
      >
        <span class="clan-dot" />
        <span class="clan-label">{{ clan.nameRu }}</span>
      </button>
    </div>

    <!-- Превью выбранного клана -->
    <Transition name="slide-fade">
      <div
        v-if="selectedClan"
        class="clan-preview"
        :style="{ '--clan-color': getClanColor(selectedClan.name) }"
      >
        <!-- Заголовок -->
        <div class="preview-header">
          <div>
            <h2 class="clan-name">{{ selectedClan.nameRu }}</h2>
            <p class="clan-nickname">«{{ selectedClan.nicknameRu }}»</p>
          </div>
          <div class="clan-sects">
            <span
              v-for="sect in selectedClan.sect"
              :key="sect"
              class="sect-badge"
            >{{ sect }}</span>
          </div>
        </div>

        <!-- Лор -->
        <p class="clan-lore">{{ selectedClan.loreRu }}</p>

        <!-- Дисциплины -->
        <div class="preview-section">
          <h3 class="section-title">Клановые Дисциплины</h3>
          <div class="disciplines-row">
            <span
              v-for="disc in selectedClan.disciplines"
              :key="disc.name"
              class="disc-badge"
            >{{ disc.nameRu }}</span>
          </div>
        </div>

        <!-- Порок -->
        <div class="preview-section">
          <h3 class="section-title">
            Порок клана
            <span class="bane-name">— {{ selectedClan.bane.nameRu }}</span>
          </h3>
          <p class="section-text">{{ selectedClan.bane.descriptionRu }}</p>
          <p class="mechanic-text">{{ selectedClan.bane.mechanicRu }}</p>
        </div>

        <!-- Компульсия -->
        <div class="preview-section">
          <h3 class="section-title">
            Компульсия
            <span class="bane-name">— {{ selectedClan.compulsion.nameRu }}</span>
          </h3>
          <p class="section-text">{{ selectedClan.compulsion.mechanicRu }}</p>
        </div>

        <!-- Советы -->
        <div class="preview-section">
          <h3 class="section-title">Советы по отыгрышу</h3>
          <ul class="tips-list">
            <li v-for="tip in selectedClan.tips" :key="tip">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.clan-selector {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.clan-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 0.5rem;
}

.clan-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  color: #ccc;
  font-size: 0.85rem;
  text-align: left;
}

.clan-btn:hover {
  border-color: var(--clan-color);
  background: color-mix(in srgb, var(--clan-color) 10%, transparent);
  color: #fff;
}

.clan-btn.active {
  border-color: var(--clan-color);
  background: color-mix(in srgb, var(--clan-color) 20%, transparent);
  color: #fff;
  box-shadow: 0 0 8px color-mix(in srgb, var(--clan-color) 40%, transparent);
}

.clan-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--clan-color);
  flex-shrink: 0;
}

.clan-preview {
  border: 1px solid color-mix(in srgb, var(--clan-color) 50%, transparent);
  border-radius: 10px;
  padding: 1.5rem;
  background: color-mix(in srgb, var(--clan-color) 8%, #111);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.clan-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--clan-color);
  margin: 0;
}

.clan-nickname {
  font-size: 0.9rem;
  color: #888;
  margin: 0;
}

.clan-sects {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.sect-badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 999px;
  color: #aaa;
}

.clan-lore {
  font-size: 0.9rem;
  color: #bbb;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.preview-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255,255,255,0.07);
}

.section-title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--clan-color);
  margin: 0 0 0.5rem;
}

.bane-name {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: #ccc;
}

.section-text {
  font-size: 0.88rem;
  color: #bbb;
  margin: 0 0 0.4rem;
  line-height: 1.5;
}

.mechanic-text {
  font-size: 0.82rem;
  color: #999;
  margin: 0;
  padding: 0.5rem 0.75rem;
  border-left: 2px solid var(--clan-color);
  background: rgba(0,0,0,0.2);
  border-radius: 0 4px 4px 0;
  line-height: 1.5;
}

.disciplines-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.disc-badge {
  font-size: 0.82rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--clan-color) 25%, transparent);
  border: 1px solid var(--clan-color);
  color: #ddd;
}

.tips-list {
  margin: 0;
  padding-left: 1.2rem;
  color: #999;
  font-size: 0.85rem;
  line-height: 1.8;
}

/* Transition */
.slide-fade-enter-active { transition: all 0.3s ease; }
.slide-fade-leave-active { transition: all 0.2s ease; }
.slide-fade-enter-from { opacity: 0; transform: translateY(-8px); }
.slide-fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
