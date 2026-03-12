<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CharacterDisciplineEntry } from '@/types/vtm.types'
import { DISCIPLINES, getDisciplineByName } from '@/data/disciplines.data'

// ============================================================
// DisciplinePanel.vue — панель Дисциплин персонажа
// ============================================================

const props = defineProps<{
  disciplines: CharacterDisciplineEntry[]
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:disciplines': [value: CharacterDisciplineEntry[]]
}>()

const activeDiscipline = ref<string | null>(null)

const enrichedDisciplines = computed(() =>
  props.disciplines.map(entry => {
    const data = getDisciplineByName(entry.name)
    return { ...entry, data }
  })
)

const activeData = computed(() =>
  activeDiscipline.value ? getDisciplineByName(activeDiscipline.value) : null
)

const availablePowers = computed(() => {
  if (!activeDiscipline.value) return []
  const entry = props.disciplines.find(d => d.name === activeDiscipline.value)
  if (!entry || !activeData.value) return []
  return activeData.value.powers.filter(p => p.level <= entry.dots)
})

const setDots = (disciplineName: string, dots: number) => {
  const updated = props.disciplines.map(d =>
    d.name === disciplineName ? { ...d, dots } : d
  )
  emit('update:disciplines', updated)
}

const togglePower = (disciplineName: string, powerName: string) => {
  const updated = props.disciplines.map(d => {
    if (d.name !== disciplineName) return d
    const already = d.selectedPowers.includes(powerName)
    return {
      ...d,
      selectedPowers: already
        ? d.selectedPowers.filter(p => p !== powerName)
        : [...d.selectedPowers, powerName],
    }
  })
  emit('update:disciplines', updated)
}
</script>

<template>
  <div class="discipline-panel">
    <div v-if="disciplines.length === 0" class="empty-state">
      Выберите клан, чтобы увидеть клановые Дисциплины
    </div>

    <div v-else class="disc-list">
      <div
        v-for="entry in enrichedDisciplines"
        :key="entry.name"
        class="disc-item"
        :class="{ expanded: activeDiscipline === entry.name }"
      >
        <!-- Заголовок дисциплины -->
        <div
          class="disc-header"
          role="button"
          tabindex="0"
          @click="activeDiscipline = activeDiscipline === entry.name ? null : entry.name"
          @keydown.enter="activeDiscipline = activeDiscipline === entry.name ? null : entry.name"
        >
          <div class="disc-info">
            <span class="disc-name">{{ entry.data?.nameRu ?? entry.name }}</span>
            <span class="disc-en">{{ entry.name }}</span>
          </div>

          <!-- Точки уровня -->
          <div class="disc-dots-row">
            <button
              v-for="n in 5"
              :key="n"
              class="dot-btn"
              :class="{ filled: n <= entry.dots }"
              type="button"
              :disabled="readonly"
              @click.stop="!readonly && setDots(entry.name, n === entry.dots ? n - 1 : n)"
            />
          </div>
        </div>

        <!-- Описание и силы -->
        <Transition name="expand">
          <div v-if="activeDiscipline === entry.name && entry.data" class="disc-body">
            <p class="disc-desc">{{ entry.data.descriptionRu }}</p>

            <div class="powers-section">
              <h4 class="powers-title">Силы (уровень ≤ {{ entry.dots }})</h4>

              <div v-if="availablePowers.length === 0" class="no-powers">
                Повысьте уровень Дисциплины, чтобы открыть силы
              </div>

              <div
                v-for="power in availablePowers"
                :key="power.name"
                class="power-item"
                :class="{
                  selected: entry.selectedPowers.includes(power.name),
                  'has-amalgam': !!power.amalgam
                }"
              >
                <div class="power-header">
                  <label class="power-check">
                    <input
                      type="checkbox"
                      :checked="entry.selectedPowers.includes(power.name)"
                      :disabled="readonly"
                      @change="togglePower(entry.name, power.name)"
                    />
                    <span class="power-level">{{ power.level }}●</span>
                    <span class="power-name">{{ power.nameRu }}</span>
                    <span class="power-name-en">{{ power.name }}</span>
                  </label>
                  <div class="power-meta">
                    <span class="meta-badge cost">⬥ {{ power.cost }}</span>
                    <span class="meta-badge duration">⏱ {{ power.duration }}</span>
                    <span v-if="power.amalgam" class="meta-badge amalgam">
                      Амальгама: {{ power.amalgam.discipline }} {{ power.amalgam.level }}+
                    </span>
                  </div>
                </div>
                <p class="power-desc">{{ power.descriptionRu }}</p>
              </div>

              <!-- Заблокированные силы -->
              <div
                v-for="power in entry.data.powers.filter(p => p.level > entry.dots)"
                :key="power.name + '-locked'"
                class="power-item locked"
              >
                <div class="power-header">
                  <div class="power-check">
                    <span class="power-level locked-level">{{ power.level }}●</span>
                    <span class="power-name locked-name">{{ power.nameRu }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.discipline-panel { display: flex; flex-direction: column; gap: 0.5rem; }

.empty-state {
  color: #666;
  font-size: 0.9rem;
  text-align: center;
  padding: 2rem;
  border: 1px dashed #333;
  border-radius: 8px;
}

.disc-list { display: flex; flex-direction: column; gap: 0.5rem; }

.disc-item {
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s;
}

.disc-item.expanded { border-color: #8b0000; }

.disc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: #161616;
  user-select: none;
}

.disc-header:hover { background: #1a1a1a; }

.disc-info { display: flex; flex-direction: column; }

.disc-name { font-weight: 600; color: #ddd; font-size: 1rem; }

.disc-en { font-size: 0.72rem; color: #555; }

.disc-dots-row { display: flex; gap: 6px; align-items: center; }

.dot-btn {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #555;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s;
  padding: 0;
}

.dot-btn.filled { background: #8b0000; border-color: #8b0000; }
.dot-btn:not(:disabled):hover { border-color: #c0392b; }

.disc-body {
  padding: 1rem;
  background: #111;
  border-top: 1px solid #222;
}

.disc-desc {
  font-size: 0.85rem;
  color: #999;
  margin: 0 0 1rem;
  line-height: 1.6;
}

.powers-section { display: flex; flex-direction: column; gap: 0.4rem; }

.powers-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #555;
  margin: 0 0 0.5rem;
}

.no-powers {
  color: #555;
  font-size: 0.85rem;
  font-style: italic;
}

.power-item {
  border: 1px solid #222;
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
  transition: all 0.15s;
}

.power-item.selected {
  border-color: #8b0000;
  background: rgba(139,0,0,0.08);
}

.power-item.locked {
  opacity: 0.35;
  cursor: not-allowed;
}

.power-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.power-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.power-check input[type="checkbox"] { accent-color: #8b0000; }

.power-level {
  font-size: 0.75rem;
  color: #8b0000;
  font-weight: 700;
}

.locked-level { color: #444; }

.power-name { font-size: 0.9rem; color: #ccc; font-weight: 500; }
.locked-name { color: #555; }
.power-name-en { font-size: 0.72rem; color: #555; }

.power-meta {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.meta-badge {
  font-size: 0.68rem;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  white-space: nowrap;
}

.meta-badge.cost { background: #1a1a1a; color: #777; border: 1px solid #333; }
.meta-badge.duration { background: #1a1a1a; color: #777; border: 1px solid #333; }
.meta-badge.amalgam { background: rgba(106,27,154,0.2); color: #ce93d8; border: 1px solid #6a1b9a; }

.power-desc {
  font-size: 0.82rem;
  color: #888;
  margin: 0.4rem 0 0;
  line-height: 1.5;
}

/* Expand transition */
.expand-enter-active, .expand-leave-active { transition: all 0.25s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }
.expand-enter-to, .expand-leave-from { max-height: 1000px; opacity: 1; }
</style>
