<template>
  <div class="flex flex-col w-full max-w-lg mx-auto px-4 py-6 gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold">Мои персонажи</h1>
      <Button icon="pi pi-plus" label="Новый" @click="router.push('/new')" />
    </div>

    <div v-if="status === 'pending'" class="text-center py-8 text-gray-400">Загрузка...</div>

    <div v-else-if="!data?.length" class="text-center py-8 text-gray-400">
      У вас пока нет персонажей
    </div>

    <div
      v-else
      v-for="char in data"
      :key="char.id"
      class="flex items-center justify-between p-4 rounded-lg border border-white/10 cursor-pointer hover:border-white/30 transition-colors"
      @click="router.push(`/${char.id}`)"
    >
      <div>
        <p class="font-medium">{{ char.name }}</p>
        <p class="text-xs text-gray-400">{{ formatDate(char.updated_at) }}</p>
      </div>
      <span class="pi pi-chevron-right text-gray-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import { useCharactersQuery } from '@/composables/useCharacter'

const router = useRouter()
const { data, status } = useCharactersQuery()

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>
