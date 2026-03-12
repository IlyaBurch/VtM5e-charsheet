<template>
  <div>
    <Button v-if="!charStore.isEdit" @click="charStore.edit" label="Edit" />
    <Button v-if="charStore.isEdit" @click="handleSave" label="Save" :loading="asyncStatus === 'loading'" />
    <div class="card flex justify-content-center">
      <Panel toggleable collapsed>
        <template #header>
          <div class="flex align-items-center name">
            <img src="@/assets/images/PngItem_939270.png" class="vtm-logo" />
            <InputText
              v-if="charStore.isEdit"
              size="small"
              class="input__text"
              v-model="charStore.character.charName"
            />
            <span v-else class="font-bold">{{ charStore.character.charName }}</span>
          </div>
        </template>
        <MainInfo :mainInfo="charStore.character.mainInfo" />
      </Panel>

      <Panel toggleable collapsed>
        <template #header>Здоровье и голод</template>
        <CommonList />
      </Panel>

      <Panel toggleable collapsed>
        <template #header>Харарктеристики</template>
        <AttributesList :attributes="charStore.character.attributes" />
      </Panel>

      <Panel toggleable collapsed>
        <template #header>Навыки</template>
        <AbilityList :abilities="charStore.character.abilities" />
      </Panel>

      <Panel toggleable collapsed>
        <template #header><span>Дисциплины</span></template>
        <DisciplinesList :disciplines="charStore.character.disciplines" />
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.font-bold {
  font-weight: bold;
  padding-left: 15px;
}

.vtm-logo {
  height: 40px;
}

.name {
  display: flex;
  align-items: center;
}

.input__text {
  width: 180px;
}
</style>
