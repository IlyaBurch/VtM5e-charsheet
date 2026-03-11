<template>
  <div v-if="store.isEdit || props.isEditing" class="attribute__li">
    <p>{{ props.name }}</p>
    <div v-if="props.isNumber">
      <InputNumber
        v-model="val"
        showButtons
        :min="0"
        :max="10"
        buttonLayout="horizontal"
        :inputStyle="{ width: '50px' }"
      />
    </div>
    <div v-else>
      <Rating v-model="val" :stars="props.amount ?? 5">
        <template #officon>
          <img src="@/assets/images/gui-form-checkbox-svgrepo-com.png" height="15" width="15" />
        </template>
        <template #onicon>
          <img
            src="@/assets/images/_filled_gui-form-checkbox-svgrepo-com.png"
            height="15"
            width="15"
          />
        </template>
      </Rating>
    </div>
    <div v-show="props.isRemovable">
      <Button icon="pi pi-trash" @click="store.removeDiscipline(props.id ?? 0)" />
    </div>
  </div>

  <div v-else class="attribute__li">
    <p>{{ props.name }}</p>
    <div v-if="props.isNumber">
      <InputNumber
        v-model="val"
        showButtons
        :min="0"
        :max="10"
        buttonLayout="horizontal"
        :inputStyle="{ width: '50px' }"
      />
    </div>
    <div v-else>
      <Rating v-model="val" readonly :cancel="false" :stars="props.amount ?? 5">
        <template #officon>
          <img src="@/assets/images/gui-form-checkbox-svgrepo-com.png" height="15" width="15" />
        </template>
        <template #onicon>
          <img
            src="@/assets/images/_filled_gui-form-checkbox-svgrepo-com.png"
            height="15"
            width="15"
          />
        </template>
      </Rating>
    </div>
  </div>
</template>

<script setup lang="ts">
import Rating from 'primevue/rating'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

interface Props {
  id?: number
  name: string
  value?: number
  objName?: string
  isEditing?: boolean
  isRemovable?: boolean
  isNumber?: boolean
  amount?: number
}

const props = withDefaults(defineProps<Props>(), {
  isRemovable: false,
  isNumber: false,
  amount: 5,
})

const val = defineModel<number>('value')
</script>

<style scoped>
.attribute__li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.input__number {
  width: 50px;
}
</style>
