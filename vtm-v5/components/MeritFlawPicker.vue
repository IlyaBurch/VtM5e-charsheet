<script setup lang="ts">
import { ref, computed } from 'vue'
import { MERITS, FLAWS, MERIT_FLAW_CATEGORIES, getMeritsFlawsForClan } from '../data/merits-flaws.data'
import type { MeritFlawCategory } from '../data/merits-flaws.data'

// ============================================================
// MeritFlawPicker.vue — выбор Достоинств и Недостатков
// ============================================================

const props = defineProps<{
  selectedMerits: string[]
  selectedFlaws: string[]
  clanName?: string | null
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:selectedMerits': [v: string[]]
  'update:selectedFlaws': [v: string[]]
}>()

const activeTab = ref<'merits' | 'flaws'>('merits')
const activeCategory = ref<MeritFlawCategory | 'all'>('all')
const search = ref('')

const availableItems = computed(() =>
  props.clanName
    ? getMeritsFlawsForClan(props.clanName)
    : [...MERITS, ...FLAWS]
)

const filteredItems = computed(() => {
  const type = activeTab.value === 'merits' ? 'merit' : 'flaw'
  return availableItems.value.filter(item => {
    if (item.type !== type) return false
    if (activeCategory.value !== 'all' && item.category !== activeCategory.value) return false
    if (search.value && !item.nameRu.toLowerCase().includes(search.value.toLowerCase())) return false
    return true
  })
})

// Точки: если массив — берём минимум для отображения
const getDotsDisplay = (dots: number | number[]) =>
  Array.isArray(dots) ? `${dots[0]}–${dots[dots.length - 1]}` : dots

const isSelected = (name: string) =>
  activeTab.value === 'merits'
    ? props.selectedMerits.includes(name)
    : props.selectedFlaws.includes(name)

const toggle = (name: string) => {
  if (props.readonly) return
  if (activeTab.value === 'merits') {
    const updated = props.selectedMerits.includes(name)
      ? props.selectedMerits.filter(m => m !== name)
      : [...props.selectedMerits, name]
    emit('update:selectedMerits', updated)
  } else {
    const updated = props.selectedFlaws.includes(name)
      ? props.selectedFlaws.filter(f => f !== name)
      : [...props.selectedFlaws, name]
    emit('update:selectedFlaws', updated)
  }
}

// Подсчёт очков
const meritPoints = computed(() =>
  MERITS.filter(m => props.selectedMerits.includes(m.name))
    .reduce((sum, m) => sum + (Array.isArray(m.dots) ? m.dots[0] : m.dots), 0)
)

const flawPoints = computed(() =>
  FLAWS.filter(f => props.selectedFlaws.includes(f.name))
    .reduce((sum, f) => sum + (Array.isArray(f.dots) ? f.dots[0] : f.dots), 0)
)
</script>

<template>
  <div class="mf-picker">
    <!-- Счётчики -->
    <div class="points-row">
      <div class="points-badge merit">
        Достоинства: <strong>{{ meritPoints }}</strong> очков
      </div>
      <div class="points-badge flaw">
        Недостатки: <strong>{{ flawPoints }}</strong> очков
      </div>
    </div>

    <!-- Табы -->
    <div class="tabs">
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'merits' }"
        type="button"
        @click="activeTab = 'merits'"
      >
        Достоинства ({{ selectedMerits.length }})
      </button>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'flaws' }"
        type="button"
        @click="activeTab = 'flaws'"
      >
        Недостатки ({{ selectedFlaws.length }})
      </button>
    </div>

    <!-- Фильтры -->
    <div class="filters">
      <input
        v-model="search"
        class="search-input"
        placeholder="Поиск..."
        type="text"
      />
      <div class="category-pills">
        <button
          class="pill"
          :class="{ active: activeCategory === 'all' }"
          type="button"
          @click="activeCategory = 'all'"
        >Все</button>
        <button
          v-for="cat in MERIT_FLAW_CATEGORIES"
          :key="cat.value"
          class="pill"
          :class="{ active: activeCategory === cat.value }"
          type="button"
          @click="activeCategory = cat.value"
        >{{ cat.label }}</button>
      </div>
    </div>

    <!-- Список -->
    <div class="items-list">
      <div v-if="filteredItems.length === 0" class="empty">Ничего не найдено</div>

      <div
        v-for="item in filteredItems"
        :key="item.name"
        class="mf-item"
        :class="{
          selected: isSelected(item.name),
          merit: item.type === 'merit',
          flaw: item.type === 'flaw',
        }"
        role="button"
        tabindex="0"
        @click="toggle(item.name)"
        @keydown.enter="toggle(item.name)"
      >
        <div class="item-header">
          <div class="item-title-row">
            <span class="item-name">{{ item.nameRu }}</span>
            <span class="item-cat">{{ item.categoryRu }}</span>
          </div>
          <div class="dots-badge" :class="item.type">
            {{ getDotsDisplay(item.dots) }}●
          </div>
        </div>
        <p class="item-desc">{{ item.descriptionRu }}</p>
        <p v-if="item.mechanicRu" class="item-mechanic">{{ item.mechanicRu }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mf-picker { display: flex; flex-direction: column; gap: 0.75rem; }

.points-row {
  display: flex;
  gap: 0.75rem;
}

.points-badge {
  flex: 1;
  text-align: center;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.82rem;
  color: #bbb;
}

.points-badge.merit { background: rgba(46,125,50,0.15); border: 1px solid #2e7d32; }
.points-badge.flaw  { background: rgba(183,28,28,0.15); border: 1px solid #b71c1c; }
.points-badge strong { color: #fff; }

.tabs {
  display: flex;
  border-bottom: 1px solid #2a2a2a;
}

.tab-btn {
  flex: 1;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: #666;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.15s;
}

.tab-btn.active { color: #fff; border-bottom-color: #8b0000; }

.filters { display: flex; flex-direction: column; gap: 0.5rem; }

.search-input {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 6px;
  color: #ddd;
  padding: 0.45rem 0.75rem;
  font-size: 0.85rem;
  width: 100%;
  box-sizing: border-box;
}

.search-input::placeholder { color: #555; }
.search-input:focus { outline: none; border-color: #555; }

.category-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.pill {
  font-size: 0.72rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid #333;
  background: transparent;
  color: #777;
  cursor: pointer;
  transition: all 0.15s;
}

.pill.active { background: #8b0000; border-color: #8b0000; color: #fff; }
.pill:hover:not(.active) { border-color: #555; color: #bbb; }

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 4px;
}

.empty { color: #555; text-align: center; padding: 2rem; font-size: 0.85rem; }

.mf-item {
  border: 1px solid #222;
  border-radius: 7px;
  padding: 0.65rem 0.85rem;
  cursor: pointer;
  transition: all 0.15s;
  user-select: none;
}

.mf-item:hover { border-color: #444; background: #161616; }
.mf-item.selected.merit { border-color: #2e7d32; background: rgba(46,125,50,0.1); }
.mf-item.selected.flaw  { border-color: #b71c1c; background: rgba(183,28,28,0.1); }

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.3rem;
}

.item-title-row { display: flex; flex-direction: column; }

.item-name { font-size: 0.9rem; font-weight: 600; color: #ccc; }

.item-cat {
  font-size: 0.68rem;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.dots-badge {
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.dots-badge.merit { color: #66bb6a; }
.dots-badge.flaw  { color: #ef5350; }

.item-desc {
  font-size: 0.82rem;
  color: #999;
  margin: 0;
  line-height: 1.5;
}

.item-mechanic {
  font-size: 0.78rem;
  color: #777;
  margin: 0.3rem 0 0;
  padding-left: 0.6rem;
  border-left: 2px solid #333;
  line-height: 1.4;
}
</style>
