<script setup lang="ts">
import { computed } from 'vue'
import { BLOOD_POTENCY_TABLE } from '../data/rules.data'

// ============================================================
// VampireStatusBar.vue — Голод, Человечность, Мощь Крови, Здоровье, Воля
// ============================================================

const props = defineProps<{
  hunger: number
  humanity: number
  bloodPotency: number
  health: number
  maxHealth: number
  healthDamage: { superficial: number; aggravated: number }
  willpower: number
  maxWillpower: number
  willpowerDamage: { superficial: number; aggravated: number }
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:hunger': [v: number]
  'update:humanity': [v: number]
  'update:bloodPotency': [v: number]
  'update:healthDamage': [v: { superficial: number; aggravated: number }]
  'update:willpowerDamage': [v: { superficial: number; aggravated: number }]
}>()

const bpData = computed(() =>
  BLOOD_POTENCY_TABLE.find(b => b.level === props.bloodPotency) ?? BLOOD_POTENCY_TABLE[1]
)

// Типы кубиков голода
const hungerDice = computed(() => {
  const h = Math.max(0, Math.min(5, props.hunger))
  return Array.from({ length: 5 }, (_, i) => ({
    index: i + 1,
    hunger: i < h,
  }))
})

// Трекер здоровья
const healthBoxes = computed(() => {
  const boxes = []
  for (let i = 0; i < props.maxHealth; i++) {
    const aggOffset = props.maxHealth - props.healthDamage.aggravated
    const supOffset = props.maxHealth - props.healthDamage.aggravated - props.healthDamage.superficial
    if (i >= aggOffset) boxes.push('aggravated')
    else if (i >= supOffset) boxes.push('superficial')
    else boxes.push('empty')
  }
  return boxes
})

// Трекер воли
const willpowerBoxes = computed(() => {
  const boxes = []
  for (let i = 0; i < props.maxWillpower; i++) {
    const aggOffset = props.maxWillpower - props.willpowerDamage.aggravated
    const supOffset = props.maxWillpower - props.willpowerDamage.aggravated - props.willpowerDamage.superficial
    if (i >= aggOffset) boxes.push('aggravated')
    else if (i >= supOffset) boxes.push('superficial')
    else boxes.push('empty')
  }
  return boxes
})

const humanityColor = computed(() => {
  const h = props.humanity
  if (h >= 8) return '#2e7d32'
  if (h >= 5) return '#f57c00'
  if (h >= 3) return '#c62828'
  return '#4a148c'
})

const setHunger = (v: number) => !props.readonly && emit('update:hunger', Math.max(0, Math.min(5, v)))
const setHumanity = (v: number) => !props.readonly && emit('update:humanity', Math.max(0, Math.min(10, v)))
const setBloodPotency = (v: number) => !props.readonly && emit('update:bloodPotency', Math.max(0, Math.min(10, v)))

const cycleHealth = (index: number) => {
  if (props.readonly) return
  const state = healthBoxes.value[index]
  const { superficial: s, aggravated: a } = props.healthDamage
  if (state === 'empty') emit('update:healthDamage', { superficial: s + 1, aggravated: a })
  else if (state === 'superficial') emit('update:healthDamage', { superficial: s - 1, aggravated: a + 1 })
  else emit('update:healthDamage', { superficial: s, aggravated: a - 1 })
}

const cycleWill = (index: number) => {
  if (props.readonly) return
  const state = willpowerBoxes.value[index]
  const { superficial: s, aggravated: a } = props.willpowerDamage
  if (state === 'empty') emit('update:willpowerDamage', { superficial: s + 1, aggravated: a })
  else if (state === 'superficial') emit('update:willpowerDamage', { superficial: s - 1, aggravated: a + 1 })
  else emit('update:willpowerDamage', { superficial: s, aggravated: a - 1 })
}
</script>

<template>
  <div class="status-bar">

    <!-- ГОЛОД -->
    <div class="status-block">
      <div class="block-label">Голод</div>
      <div class="hunger-track">
        <button
          v-for="d in hungerDice"
          :key="d.index"
          class="hunger-die"
          :class="{ filled: d.hunger }"
          type="button"
          :title="`Голод ${d.index}`"
          @click="setHunger(hunger === d.index ? d.index - 1 : d.index)"
        >
          <span class="die-face">{{ d.hunger ? '⬛' : '⬜' }}</span>
        </button>
      </div>
      <span class="block-value">{{ hunger }}/5</span>
    </div>

    <!-- ЧЕЛОВЕЧНОСТЬ -->
    <div class="status-block">
      <div class="block-label">Человечность</div>
      <div class="humanity-track">
        <button
          v-for="n in 10"
          :key="n"
          class="humanity-pip"
          :class="{ filled: n <= humanity }"
          :style="{ '--fill-color': humanityColor }"
          type="button"
          @click="setHumanity(humanity === n ? n - 1 : n)"
        />
      </div>
      <span class="block-value">{{ humanity }}/10</span>
    </div>

    <!-- МОЩЬ КРОВИ -->
    <div class="status-block">
      <div class="block-label">Мощь Крови</div>
      <div class="bp-track">
        <button
          v-for="n in 10"
          :key="n"
          class="bp-pip"
          :class="{ filled: n <= bloodPotency }"
          type="button"
          @click="setBloodPotency(bloodPotency === n ? n - 1 : n)"
        />
      </div>
      <span class="block-value">{{ bloodPotency }}/10</span>
    </div>

    <!-- BP ДЕТАЛИ -->
    <div class="bp-details">
      <div class="bp-stat">
        <span class="bp-stat-label">Прилив крови</span>
        <span class="bp-stat-val">+{{ bpData.bloodSurge }}</span>
      </div>
      <div class="bp-stat">
        <span class="bp-stat-label">Исцеление</span>
        <span class="bp-stat-val">{{ bpData.mendPerRouse }} ур.</span>
      </div>
      <div class="bp-stat">
        <span class="bp-stat-label">Бонус силы</span>
        <span class="bp-stat-val">+{{ bpData.powerBonus }}</span>
      </div>
      <div class="bp-stat">
        <span class="bp-stat-label">Порок</span>
        <span class="bp-stat-val">{{ bpData.baneSeverity }}</span>
      </div>
    </div>

    <div v-if="bpData.feedingPenalty !== 'Нет'" class="feeding-penalty">
      ⚠ {{ bpData.feedingPenalty }}
    </div>

    <!-- ЗДОРОВЬЕ -->
    <div class="status-block">
      <div class="block-label">Здоровье ({{ maxHealth }})</div>
      <div class="damage-track">
        <button
          v-for="(state, i) in healthBoxes"
          :key="i"
          class="damage-box"
          :class="state"
          type="button"
          :title="state === 'empty' ? 'Пусто' : state === 'superficial' ? 'Поверхностный' : 'Отягощённый'"
          @click="cycleHealth(i)"
        >
          <span v-if="state === 'superficial'">╱</span>
          <span v-else-if="state === 'aggravated'">✕</span>
        </button>
      </div>
      <div class="damage-legend">
        <span class="legend-sup">╱ Поверхностный</span>
        <span class="legend-agg">✕ Отягощённый</span>
      </div>
    </div>

    <!-- ВОЛЯ -->
    <div class="status-block">
      <div class="block-label">Сила воли ({{ maxWillpower }})</div>
      <div class="damage-track">
        <button
          v-for="(state, i) in willpowerBoxes"
          :key="i"
          class="damage-box willpower"
          :class="state"
          type="button"
          @click="cycleWill(i)"
        >
          <span v-if="state === 'superficial'">╱</span>
          <span v-else-if="state === 'aggravated'">✕</span>
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.status-bar {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.status-block { display: flex; flex-direction: column; gap: 0.4rem; }

.block-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #555;
}

.block-value {
  font-size: 0.75rem;
  color: #666;
  text-align: right;
}

/* ГОЛОД */
.hunger-track { display: flex; gap: 6px; }

.hunger-die {
  width: 32px;
  height: 32px;
  border: 2px solid #333;
  border-radius: 6px;
  background: #111;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  padding: 0;
  font-size: 1rem;
}

.hunger-die.filled { border-color: #c0392b; background: rgba(192,57,43,0.2); }
.hunger-die:hover { border-color: #e74c3c; }

/* ЧЕЛОВЕЧНОСТЬ */
.humanity-track {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.humanity-pip {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 2px solid #333;
  background: transparent;
  cursor: pointer;
  transition: all 0.12s;
  padding: 0;
}

.humanity-pip.filled {
  background: var(--fill-color, #2e7d32);
  border-color: var(--fill-color, #2e7d32);
}

/* МОЩЬ КРОВИ */
.bp-track {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.bp-pip {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #333;
  background: transparent;
  cursor: pointer;
  transition: all 0.12s;
  padding: 0;
}

.bp-pip.filled { background: #6a1b9a; border-color: #9c27b0; }

/* BP ДЕТАЛИ */
.bp-details {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  background: #111;
  border-radius: 6px;
  padding: 0.6rem;
}

.bp-stat { display: flex; flex-direction: column; align-items: center; }

.bp-stat-label {
  font-size: 0.65rem;
  color: #555;
  text-align: center;
}

.bp-stat-val {
  font-size: 1rem;
  font-weight: 700;
  color: #9c27b0;
}

.feeding-penalty {
  font-size: 0.78rem;
  color: #ef9a9a;
  background: rgba(183,28,28,0.1);
  border: 1px solid rgba(183,28,28,0.3);
  border-radius: 5px;
  padding: 0.4rem 0.6rem;
}

/* ТРЕКЕРЫ УРОНА */
.damage-track { display: flex; gap: 4px; flex-wrap: wrap; }

.damage-box {
  width: 28px;
  height: 28px;
  border: 2px solid #444;
  border-radius: 4px;
  background: #111;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.12s;
  padding: 0;
  color: transparent;
}

.damage-box.superficial {
  border-color: #f57c00;
  background: rgba(245,124,0,0.15);
  color: #f57c00;
}

.damage-box.aggravated {
  border-color: #c62828;
  background: rgba(198,40,40,0.2);
  color: #ef5350;
}

.damage-box.willpower.superficial {
  border-color: #1565c0;
  background: rgba(21,101,192,0.15);
  color: #42a5f5;
}

.damage-box.willpower.aggravated {
  border-color: #311b92;
  background: rgba(49,27,146,0.2);
  color: #7c4dff;
}

.damage-legend {
  display: flex;
  gap: 1rem;
  font-size: 0.68rem;
}

.legend-sup { color: #f57c00; }
.legend-agg { color: #ef5350; }
</style>
