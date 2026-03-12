<template>
  <div class="header">
    <div v-if="isBeta" class="beta-banner">
      ⚠ БЕТА-ВЕРСИЯ — возможны ошибки и нестабильная работа
    </div>
    <Toolbar>
      <template #start>
        <Button link>
          <router-link to="/">
            <img src="@/assets/images/PngItem_1379414_white.png" class="logo" />
          </router-link>
        </Button>
      </template>
      <template #end>
        <Button
          type="button"
          icon="pi pi-ellipsis-v"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu v-if="store.isLog" ref="menu" id="overlay_menu" :model="itemsLogged" :popup="true">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
        </Menu>
        <Menu v-else ref="menu" id="overlay_menu" :model="items" :popup="true">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </template>
    </Toolbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import Menu from 'primevue/menu'

import { useUserStore } from '@/stores/user'
import { useCounterStore } from '@/stores/counter'
import type { MenuItem } from '@/types'

const store = useUserStore()
const char = useCounterStore()

const isBeta = import.meta.env.VITE_IS_BETA === 'true'

const menu = ref<InstanceType<typeof Menu> | null>(null)

const toggle = (event: Event): void => {
  menu.value?.toggle(event)
}

const items = ref<MenuItem[]>([
  { label: 'Авторизироваться', icon: 'pi pi-sign-in', route: '/login' },
  { label: 'Зарегистрироваться', icon: 'pi pi-user-plus', route: '/register' }
])

const itemsLogged = ref<MenuItem[]>([
  {
    label: 'Выйти из профиля',
    icon: 'pi pi-sign-out',
    command: () => {
      store.logOut()
    },
    route: '/'
  },
  {
    label: 'Создать нового персонажа',
    icon: 'pi pi-plus',
    command: () => {
      char.isEdit = true
    },
    route: '/char'
  }
])
</script>

<style scoped>
.logo {
  width: 100px;
}
.header {
  margin-bottom: 10px;
}
.beta-banner {
  background-color: #b22222;
  color: #fff;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  padding: 6px 0;
}
</style>
