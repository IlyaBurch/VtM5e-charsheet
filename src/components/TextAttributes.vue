<template>
  <div v-if="store.isEdit" class="flex justify-between items-center">
    <p>{{ props.name }}</p>
    <div>
      <InputText size="small" class="w-45" v-model="val" />
    </div>
  </div>
  <div v-else class="flex justify-between items-center">
    <p>{{ props.name }}</p>
    <div>
      <p>{{ props.value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useCharacterStore } from '@/stores/character'

const store = useCharacterStore()

const props = defineProps<{
  name: string
  value?: string
  isEditing?: boolean
}>()

const val = defineModel<string>('value')
</script>
