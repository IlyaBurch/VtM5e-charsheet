<template>
  <div class="flex justify-between items-center py-1 gap-2">
    <p class="shrink-0">{{ props.name }}</p>
    <div class="flex flex-col items-center gap-2">
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
        <Rating v-model="val" :cancel="false" :stars="amountVal">
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
      <InputNumber
        v-if="store.isEdit && !props.isNumber"
        v-model="amountVal"
        showButtons
        :min="1"
        :max="10"
        buttonLayout="horizontal"
        :inputStyle="{ width: '40px' }"
        class="w-full"
      />
      <Button
        v-if="store.isEdit && props.isRemovable"
        icon="pi pi-trash"
        severity="danger"
        text
        @click="store.removeDiscipline(props.id ?? 0)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import Rating from 'primevue/rating'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

import { useCharacterStore } from '@/stores/character'
import { useUserStore } from '@/stores/user'
import { useSaveCharacter, useCharacterPayload } from '@/composables/useCharacter'

const store = useCharacterStore()
const userStore = useUserStore()
const { mutate: save } = useSaveCharacter()

interface Props {
  id?: number
  name: string
  isRemovable?: boolean
  isNumber?: boolean
}

const props = withDefaults(defineProps<Props>(), { isRemovable: false, isNumber: false })

const val = defineModel<number>('value')
const amountVal = defineModel<number>('amount', { default: 5 })

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(val, () => {
  if (!userStore.isLog) return
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    save(useCharacterPayload())
  }, 1500)
})

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>
