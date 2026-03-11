<template>
  <div v-if="store.isEdit" class="attribute__li">
    <p>{{ props.name }}</p>
    <div>
      <InputText size="small" class="input__text" v-model="val" />
    </div>
  </div>
  <div v-else class="attribute__li">
    <p>{{ props.name }}</p>
    <div>
      <p>{{ props.value }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

const props = defineProps<{
  name: string
  value?: string
  isEditing?: boolean
}>()

const val = defineModel<string>('value')
</script>

<style scoped>
.attribute__li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card {
  padding: 0;
}
.input__text {
  width: 180px;
}
</style>
