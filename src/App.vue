<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import DarkPackFooter from './components/DarkPackFooter.vue'
import { useSystemStore, SYSTEMS } from './stores/system'
import { useUserStore } from './stores/user'

const route = useRoute()
const router = useRouter()
const systemStore = useSystemStore()
const userStore = useUserStore()

// Hide sidebar on landing page
const showSidebar = computed(() => route.name !== 'home' && route.name !== 'auth')
</script>

<template>
  <div class="app-layout">
    <!-- Desktop Sidebar -->
    <AppSidebar v-if="showSidebar" />

    <div class="app-content">
      <!-- Mork Borg yellow strip -->
      <div class="mb-strip" />

      <!-- Mobile header (shown on char pages) -->
      <header v-if="showSidebar" class="site-hdr">
        <span class="site-logo">CAINITE</span>
        <div style="flex:1; display:flex; gap:0; overflow-x:auto; scrollbar-width:none;">
          <span
            v-for="sys in SYSTEMS"
            :key="sys.id"
            class="sys-pill"
            :class="{ active: systemStore.currentId === sys.id }"
            @click="systemStore.setSystem(sys.id)"
          >{{ sys.short }}</span>
        </div>
        <button
          v-if="userStore.isLog"
          class="sb-btn"
          style="width:auto; padding:4px 10px;"
          @click="() => {}"
        >Выйти</button>
        <button
          v-else
          class="sb-btn"
          style="width:auto; padding:4px 10px;"
          @click="router.push('/auth')"
        >Войти</button>
      </header>

      <div class="app-scroll">
        <RouterView />
      </div>

      <DarkPackFooter v-if="showSidebar" />
    </div>
  </div>
</template>
