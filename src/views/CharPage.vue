<template>
  <div class="flex flex-col w-full max-w-lg mx-auto px-4 pb-8">
    <div v-if="loading" class="text-center py-12 text-gray-400">Загрузка...</div>
    <div v-else-if="loadError" class="text-center py-12 text-red-400">{{ loadError }}</div>
    <template v-else>
      <p v-if="!userStore.isLog" class="text-sm text-amber-500/70 text-center py-2">
        Без регистрации изменения будут утеряны при выходе
      </p>
      <div class="flex gap-2 py-3">
        <Button
          icon="pi pi-arrow-left"
          text
          @click="router.push('/characters')"
          aria-label="Назад"
        />
        <Button
          v-if="!charStore.isEdit"
          @click="charStore.edit"
          label="Редактировать"
          class="grow"
        />
        <Button
          v-if="charStore.isEdit"
          @click="handleSave"
          label="Сохранить"
          class="grow"
          :loading="asyncStatus === 'loading'"
        />
        <Button
          v-if="charStore.isEdit && charStore.characterId"
          icon="pi pi-trash"
          text
          severity="danger"
          @click="handleDelete"
          :loading="deleteStatus === 'loading'"
          aria-label="Удалить"
        />
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
        <MainInfo :mainInfo="charStore.character.mainInfo.filter(i => i.name !== 'Клан')" />
      </Panel>

      <Panel toggleable collapsed class="w-full">
        <template #header>Клан</template>
        <ClanSelector
          :modelValue="charStore.character.clan ?? null"
          @update:modelValue="charStore.setClan($event)"
        />
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'
import { useUserStore } from '@/stores/user'
import { useSaveCharacter, useCharacterPayload, useDeleteCharacter } from '@/composables/useCharacter'
import { fetchCharacter } from '@/services/characters'

import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import AttributesList from '@/components/AttributesList.vue'
import AbilityList from '@/components/AbilityList.vue'
import CommonList from '@/components/CommonList.vue'
import MainInfo from '@/components/MainInfo.vue'
import DisciplinesList from '@/components/DisciplinesList.vue'
import ClanSelector from '@/components/ClanSelector.vue'

const route = useRoute()
const router = useRouter()
const charStore = useCharacterStore()
const userStore = useUserStore()
const { mutate: saveCharacter, asyncStatus } = useSaveCharacter()
const { mutate: deleteCharacter, asyncStatus: deleteStatus } = useDeleteCharacter()

const loading = ref(false)
const loadError = ref<string | null>(null)

onMounted(async () => {
  if (route.name === 'new') {
    charStore.reset()
  } else {
    loading.value = true
    try {
      const data = await fetchCharacter(Number(route.params.id))
      charStore.loadCharacter(data)
    } catch {
      loadError.value = 'Персонаж не найден'
    } finally {
      loading.value = false
    }
  }
})

const handleSave = () => {
  saveCharacter(useCharacterPayload())
  charStore.save()
}

const handleDelete = () => {
  if (charStore.characterId) {
    deleteCharacter(charStore.characterId)
  }
}

let autoSaveInterval: ReturnType<typeof setInterval> | null = null

watch(
  () => charStore.isEdit,
  (editing) => {
    if (editing && userStore.isLog) {
      autoSaveInterval = setInterval(
        () => {
          saveCharacter(useCharacterPayload())
        },
        3 * 60 * 1000
      )
    } else {
      if (autoSaveInterval) clearInterval(autoSaveInterval)
    }
  }
)

onUnmounted(() => {
  if (autoSaveInterval) clearInterval(autoSaveInterval)
})
</script>
