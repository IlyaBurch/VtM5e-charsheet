<template>
  <h1 class="text-center px-24 pt-4 mb-8 text-2xl">{{ t('title') }}</h1>
  <section class="text-center mx-auto pt-12 pb-20 px-16 max-w-2xl">
    <p>{{ t('info') }}</p>
  </section>
  <div class="space-y-4">
    <RouterLink to="/new" class="grid place-items-center">
      <Button class="w-60" :label="t('buttons.create')" />
    </RouterLink>
    <template v-if="!store.isLog">
      <RouterLink to="/login" class="grid place-items-center">
        <Button class="w-60" :label="t('buttons.login')" />
      </RouterLink>
      <RouterLink to="/register" class="grid place-items-center">
        <Button class="w-60" :label="t('buttons.register')" />
      </RouterLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const { t } = useI18n({
  inheritLocale: true,
  messages: {
    en: {
      title: 'Interactive character sheet for TTRPG Vampire: the Masquerade',
      buttons: { login: 'Login', register: 'Register', create: 'Create character' },
      info: 'This unofficial website is created for non-commercial use and offers an interactive character sheet for the game "Vampires: the Masquerade".'
    },
    ru: {
      title: 'Интерактивный лист персонажа для НРИ Vampire: the Masquerade',
      buttons: { login: 'Авторизация', register: 'Регистрация', create: 'Создать персонажа' },
      info: 'Этот неофициальный сайт создан для некоммерческого использования и предлагает интерактивный лист персонажа для игры "Vampires: the Masquerade".'
    }
  }
})
</script>
