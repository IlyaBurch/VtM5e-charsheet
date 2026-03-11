<template>
  <CharAttributes
    :name="'Здоровье'"
    v-model:amount="charStore.character.common.maxHealth"
    v-model:value="charStore.character.common.health"
  />
  <CharAttributes
    :name="'Макс. здоровье'"
    :isNumber="true"
    :amount="10"
    v-model:value="charStore.character.common.maxHealth"
  />
  <CharAttributes
    :name="'Воля'"
    v-model:amount="charStore.character.common.maxWill"
    v-model:value="charStore.character.common.will"
  />
  <CharAttributes
    :name="'Макс. воля'"
    :isNumber="true"
    :amount="10"
    v-model:value="charStore.character.common.maxWill"
  />
  <CharAttributes
    :name="'Человечность'"
    v-model:amount="charStore.character.common.maxHumanity"
    v-model:value="charStore.character.common.humanity"
  />
  <CharAttributes
    :name="'Макс. человечность'"
    :isNumber="true"
    :amount="10"
    v-model:value="charStore.character.common.maxHumanity"
  />
  <CharAttributes :name="'Голод'" v-model:value="charStore.character.common.hunger" />
</template>

<script setup lang="ts">
import CharAttributes from './CharAttributes.vue'
import { useCharacterStore } from '@/stores/character'

const charStore = useCharacterStore()
</script>

<style lang="scss" scoped></style>
