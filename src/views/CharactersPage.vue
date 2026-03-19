<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSystemStore } from '@/stores/system'
import { useCharactersQuery, useDeleteCharacter } from '@/composables/useCharacter'

const router = useRouter()
const systemStore = useSystemStore()
const { data, status } = useCharactersQuery()
const deleteMutation = useDeleteCharacter()

function handleDelete(id: number) {
  deleteMutation.mutate(id)
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<template>
  <div style="display:flex; flex-direction:column; height:100%;">
    <!-- Page header -->
    <div class="page-header">
      <span class="page-header-title">{{ systemStore.current.short }}</span>
      <button class="action-btn primary" @click="router.push('/characters/new')">
        + Новый персонаж
      </button>
    </div>

    <!-- Loading -->
    <div v-if="status === 'pending'" style="padding:40px 20px; text-align:center; color:var(--t3); font-size:13px; letter-spacing:1px;">
      ЗАГРУЗКА...
    </div>

    <!-- Empty -->
    <div v-else-if="!data?.length" style="padding:60px 20px; text-align:center;">
      <div style="font-family:var(--font-head); font-size:28px; color:var(--b); letter-spacing:4px; margin-bottom:8px;">
        ПУСТО
      </div>
      <p style="font-size:13px; color:var(--t3); letter-spacing:1px; margin-bottom:24px;">
        У вас пока нет персонажей
      </p>
      <button class="action-btn primary" @click="router.push('/characters/new')">
        Создать первого персонажа
      </button>
    </div>

    <!-- List -->
    <div v-else style="flex:1; overflow-y:auto;">
      <div
        v-for="char in data"
        :key="char.id"
        class="char-list-item"
        @click="router.push(`/characters/${char.id}`)"
      >
        <span class="char-list-dot" />
        <div style="flex:1; min-width:0;">
          <div class="char-list-name">{{ char.name }}</div>
          <div class="char-list-meta">{{ formatDate(char.updated_at) }}</div>
        </div>
        <button
          class="action-btn danger"
          style="padding:5px 10px; font-size:12px; flex-shrink:0;"
          :disabled="deleteMutation.asyncStatus.value === 'loading'"
          @click.stop="handleDelete(char.id)"
        >✕</button>
        <span style="color:var(--t3); font-size:12px; flex-shrink:0;">›</span>
      </div>
    </div>

    <!-- Mork Borg demo link when mork active -->
    <div v-if="systemStore.currentId === 'mork'" style="padding:12px 20px; border-top:1px solid var(--b2);">
      <button class="action-btn" style="width:100%;" @click="router.push('/morkborg')">
        Открыть демо-лист Mörk Borg →
      </button>
    </div>
  </div>
</template>
