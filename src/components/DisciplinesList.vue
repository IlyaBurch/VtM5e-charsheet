<template>
  <Button label="Добавить новую дисциплину" icon="pi pi-plus" @click="addDiscipline" />
  <div v-if="adding">
    <div class="attribute__li">
      <InputText size="small" class="input__text" v-model="addName" />
      <Rating v-model="addValue" :stars="amount">
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
    <div class="adding__buttons">
      <Button
        label="Сохранить"
        class="adding__buttons--button"
        icon="pi pi-save"
        @click="saveDiscipline"
      />
      <Button
        label="Отменить"
        class="adding__buttons--button"
        icon="pi pi-times"
        @click="discard"
      />
    </div>
  </div>
  <div v-else></div>
  <CharAttributes
    v-for="item in props.disciplines"
    :key="item.id"
    :id="item.id"
    :name="item.name"
    v-model:value="item.value"
    :isEditing="true"
    :isRemovable="true"
    :objName="'disciplines'"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CharAttributes from './CharAttributes.vue'

import Button from 'primevue/button'
import Rating from 'primevue/rating'
import InputText from 'primevue/inputtext'

import { useCharacterStore } from '@/stores/character'
import type { Discipline } from '@/types'

const store = useCharacterStore()

const props = defineProps<{
  isEditing?: boolean
  disciplines: Discipline[]
}>()

const attributes = store.character.disciplines

const amount = 5

const adding = ref(false)
const addName = ref('')
const addValue = ref<number>(0)
const addId = ref<number>(0)

function addDiscipline(): void {
  adding.value = true
}

function saveDiscipline(): void {
  addId.value = attributes.length + 1
  store.addDiscipline(addId.value, addName.value, addValue.value)
  discard()
}

function discard(): void {
  adding.value = false
  addName.value = ''
  addValue.value = 0
}
</script>

<style scoped>
.input__text {
  width: 180px;
}
.attribute__li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
}
.adding__buttons {
  display: flex;
  margin-top: 13px;
}
.adding__buttons--button {
  flex-grow: 1;
}
</style>
