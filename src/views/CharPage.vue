<template>
  <div class="flex flex-col w-full max-w-lg mx-auto px-4 pb-8">
    <div class="flex gap-2 py-3">
      <Button v-if="!charStore.isEdit" @click="charStore.edit" label="Редактировать" class="w-full" />
      <Button v-if="charStore.isEdit" @click="handleSave" label="Сохранить" class="w-full" :loading="asyncStatus === 'loading'" />
    </div>

    <Panel toggleable collapsed class="w-full">
      <template #header>
        <div class="flex items-center gap-2">
          <img src="@/assets/images/PngItem_939270.png" class="h-10" />
          <InputText
            v-if="charStore.isEdit"
            size="small"
            class="w-45"
            v-model="charStore.character.charName"
          />
          <span v-else class="font-bold">{{ charStore.character.charName }}</span>
        </div>
      </template>
      <MainInfo :mainInfo="charStore.character.mainInfo" />
    </Panel>

    <Panel toggleable collapsed class="w-full">
      <template #header>Здоровье и голод</template>
      <CommonList />
    </Panel>

    <Panel toggleable collapsed class="w-full">
      <template #header>Характеристики</template>
      <AttributesList :attributes="charStore.character.attributes" />
    </Panel>

    <Panel toggleable collapsed class="w-full">
      <template #header>Навыки</template>
      <AbilityList :abilities="charStore.character.abilities" />
    </Panel>

    <Panel toggleable collapsed class="w-full">
      <template #header>Дисциплины</template>
      <DisciplinesList :disciplines="charStore.character.disciplines" />
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { useSaveCharacter, useCharacterPayload } from '@/composables/useCharacter'

import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import AttributesList from '@/components/AttributesList.vue'
import AbilityList from '@/components/AbilityList.vue'
import CommonList from '@/components/CommonList.vue'
import MainInfo from '@/components/MainInfo.vue'
import DisciplinesList from '@/components/DisciplinesList.vue'

const charStore = useCharacterStore()
const { mutate: saveCharacter, asyncStatus } = useSaveCharacter()

const handleSave = () => {
  saveCharacter(useCharacterPayload())
  charStore.save()
}

let autoSaveInterval: ReturnType<typeof setInterval> | null = null

watch(() => charStore.isEdit, (editing) => {
  if (editing) {
    autoSaveInterval = setInterval(() => {
      saveCharacter(useCharacterPayload())
    }, 3 * 60 * 1000)
  } else {
    if (autoSaveInterval) clearInterval(autoSaveInterval)
  }
})

onUnmounted(() => {
  if (autoSaveInterval) clearInterval(autoSaveInterval)
})
</script>
