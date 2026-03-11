<template>
  <div>
    <CharAttributes
      v-for="(item, index) in store.character.abilities"
      :key="index"
      :name="item.ruName"
      v-model:value="item.value"
    />
  </div>
</template>

<script setup lang="ts">
import CharAttributes from './CharAttributes.vue'
import { useCharacterStore } from '@/stores/character'
import type { Ability } from '@/types'

defineProps<{
  abilities: Ability[]
}>()

const store = useCharacterStore()
</script>

<style lang="scss" scoped></style>
