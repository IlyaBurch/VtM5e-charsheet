<template>
  <div>
    <CharAttributes
      v-for="item in props.attributes"
      :key="item.id"
      :name="item.ruName"
      v-model:value="item.value"
    />
  </div>
</template>

<script setup lang="ts">
import CharAttributes from './CharAttributes.vue'
import type { Attribute } from '@/types'

const props = defineProps<{
  attributes: Attribute[]
}>()
</script>

<style lang="scss" scoped></style>
