<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSystemStore, SYSTEMS } from '@/stores/system'
import { useUserStore } from '@/stores/user'
import { useLogoutMutation } from '@/composables/useAuth'

const route = useRoute()
const router = useRouter()
const systemStore = useSystemStore()
const userStore = useUserStore()
const { mutate: logout } = useLogoutMutation()

// Nav items per system
const vtmNav = [
  { label: 'Персонажи', to: '/characters' },
  { label: 'Новый персонаж', to: '/characters/new' },
]
const morkNav = [
  { label: 'Персонажи', to: '/characters' },
  { label: 'Лист (демо)', to: '/morkborg' },
]

const navItems = computed(() =>
  systemStore.currentId === 'mork' ? morkNav : vtmNav
)

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}

function handleLogout() {
  logout()
}
</script>

<template>
  <aside class="sidebar">
    <div class="sb-header">
      <span class="sb-logo">CAINITE</span>
      <div class="sb-system-label">{{ systemStore.current.short }}</div>
    </div>

    <nav class="sb-nav">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="sb-nav-item"
        :class="{ active: isActive(item.to) }"
      >
        {{ item.label }}
      </router-link>

      <div class="sb-divider" />
      <div class="sb-section-title">Системы</div>

      <div
        v-for="sys in SYSTEMS"
        :key="sys.id"
        class="sb-sys-item"
        :class="{ active: systemStore.currentId === sys.id }"
        @click="systemStore.setSystem(sys.id); router.push('/characters')"
      >
        <span class="sb-sys-dot" :style="{ color: sys.accent }" />
        {{ sys.short }}
      </div>
    </nav>

    <div class="sb-auth">
      <button class="sb-btn" @click="router.push('/characters/new')">Экспорт</button>
      <button
        v-if="userStore.isLog"
        class="sb-btn"
        @click="handleLogout"
      >Выйти</button>
      <button
        v-else
        class="sb-btn"
        @click="router.push('/auth')"
      >Войти</button>
    </div>
  </aside>
</template>
