<script setup lang="ts">
import { computed } from 'vue'
import type { Attribute, Skill } from '../types/vtm.types'
import { ATTRIBUTES, SKILLS } from '../data/rules.data'

// ============================================================
// AttributeSkillGrid.vue — сетка атрибутов и навыков
// ============================================================

const props = defineProps<{
  attributes: Partial<Record<Attribute, number>>
  skills: Partial<Record<Skill, number>>
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:attributes': [value: Partial<Record<Attribute, number>>]
  'update:skills': [value: Partial<Record<Skill, number>>]
}>()

const categories = ['physical', 'social', 'mental'] as const
const categoryLabels: Record<string, string> = {
  physical: 'Физические',
  social: 'Социальные',
  mental: 'Ментальные',
}

const attrsByCategory = computed(() =>
  categories.map(cat => ({
    label: categoryLabels[cat],
    items: ATTRIBUTES.filter(a => a.category === cat),
  }))
)

const skillsByCategory = computed(() =>
  categories.map(cat => ({
    label: categoryLabels[cat],
    items: SKILLS.filter(s => s.category === cat),
  }))
)

const setAttr = (attr: Attribute, val: number) => {
  emit('update:attributes', { ...props.attributes, [attr]: Math.max(1, Math.min(5, val)) })
}

const setSkill = (skill: Skill, val: number) => {
  emit('update:skills', { ...props.skills, [skill]: Math.max(0, Math.min(5, val)) })
}

const getDots = (map: Partial<Record<string, number>>, key: string, min = 0) =>
  map[key] ?? min
</script>

<template>
  <div class="as-grid">
    <!-- АТРИБУТЫ -->
    <section class="as-section">
      <h3 class="as-section-title">Атрибуты</h3>
      <div class="category-row">
        <div
          v-for="cat in attrsByCategory"
          :key="cat.label"
          class="category-col"
        >
          <h4 class="cat-label">{{ cat.label }}</h4>
          <div
            v-for="attr in cat.items"
            :key="attr.name"
            class="trait-row"
          >
            <span class="trait-name">{{ attr.nameRu }}</span>
            <div class="dots-row">
              <button
                v-for="n in 5"
                :key="n"
                class="dot"
                :class="{ filled: n <= getDots(attributes, attr.name, 1) }"
                type="button"
                :disabled="readonly"
                @click="!readonly && setAttr(attr.name as Attribute, n)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- НАВЫКИ -->
    <section class="as-section">
      <h3 class="as-section-title">Навыки</h3>
      <div class="category-row">
        <div
          v-for="cat in skillsByCategory"
          :key="cat.label"
          class="category-col"
        >
          <h4 class="cat-label">{{ cat.label }}</h4>
          <div
            v-for="skill in cat.items"
            :key="skill.name"
            class="trait-row"
          >
            <span class="trait-name">{{ skill.nameRu }}</span>
            <div class="dots-row">
              <button
                v-for="n in 5"
                :key="n"
                class="dot skill-dot"
                :class="{ filled: n <= getDots(skills, skill.name, 0) }"
                type="button"
                :disabled="readonly"
                @click="!readonly && setSkill(skill.name as Skill, getDots(skills, skill.name) === n ? n - 1 : n)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.as-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.as-section-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #8b0000;
  margin: 0 0 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #2a2a2a;
}

.category-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .category-row { grid-template-columns: 1fr; }
}

.cat-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #555;
  margin: 0 0 0.6rem;
}

.trait-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.3rem 0;
  border-bottom: 1px solid #1a1a1a;
}

.trait-name {
  font-size: 0.85rem;
  color: #bbb;
}

.dots-row {
  display: flex;
  gap: 5px;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #444;
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: all 0.12s;
  flex-shrink: 0;
}

.dot.filled { background: #8b0000; border-color: #8b0000; }
.dot.skill-dot.filled { background: #5d4037; border-color: #795548; }

.dot:not(:disabled):hover {
  border-color: #c0392b;
  transform: scale(1.15);
}
</style>
