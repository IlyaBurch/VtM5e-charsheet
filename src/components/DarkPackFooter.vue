<script setup lang="ts">
import { computed } from 'vue'
import { useSystemStore } from '@/stores/system'

const systemStore = useSystemStore()

const badge = computed(() => systemStore.currentId === 'mork' ? 'MÖRK BORG' : 'DARK PACK')

const copyHtml = computed(() => {
  if (systemStore.currentId === 'mork') {
    return 'Совместимо с Mörk Borg по лицензии MÖRK BORG Third Party License.'
  }
  return 'Portions of the materials are the copyrights and trademarks of Paradox Interactive AB, and are used with permission. All rights reserved. For more information please visit worldofdarkness.com'
})

const disclaimer = computed(() => {
  if (systemStore.currentId === 'mork') {
    return 'Неофициальный фан-проект.'
  }
  return 'Cainite — неофициальный фан-сайт. Не является официальным материалом World of Darkness или Paradox Interactive.'
})
</script>

<template>
  <footer class="dp-footer">
    <span class="dp-badge">{{ badge }}</span>
    <span class="dp-copy" v-html="copyHtml" />
    <span class="dp-disclaimer">{{ disclaimer }}</span>
  </footer>
</template>
