<template>
  <div>
    <TextAttributes
      v-for="item in props.mainInfo"
      :key="item.id"
      :name="item.name"
      v-model:value="item.value"
    />
  </div>
</template>

<script setup lang="ts">
import TextAttributes from './TextAttributes.vue'
import type { MainInfoItem } from '@/types'

const props = defineProps<{
  mainInfo: MainInfoItem[]
}>()
</script>

<style lang="scss" scoped></style>
