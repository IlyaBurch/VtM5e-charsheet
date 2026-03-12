<template>
  <h1 class="text-center mb-8 text-2xl">{{ t('title') }}</h1>
  <section class="text-center max-w-fit mx-auto pt-12 pb-20 px-16">
    <p>{{ t('info') }}</p>
    <p>{{ t('dev') }}</p>
  </section>
  <RouterLink to="/char" class="grid place-items-center">
    <Button class="w-60" :label="t('buttons.create')" />
  </RouterLink>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({
  inheritLocale: true,
  messages: {
    en: {
      title: 'Interactive character sheet for TTRPG Vampire: the Masquerade',
      buttons: {
        login: 'Login',
        register: 'Register',
        create: 'Create character',
      },
      info: 'This unofficial website is created for non-commercial use and offers an interactive character sheet for the game "Vampires: the Masquerade".',
      dev: 'At the moment, it is not possible to save characters, but the data in the sheet will not be lost when the page is reloaded',
    },
    ru: {
      title: 'Интерактивный лист персонажа для НРИ Vampire: the Masquerade',
      buttons: {
        login: 'Авторизация',
        register: 'Регистрация',
        create: 'Создать персонажа',
      },
      info: 'Этот неофициальный сайт создан для некоммерческого использования и предлагает интерактивный лист персонажа для игры "Vampires: the Masquerade".',
      dev: 'В данный момент отсутствует возможность сохранения персонажей, но данные в листе при перезагрузке страницы не будут утеряны',
    },
  },
})
</script>
