<template>
  <div class="login__wrappper">
    <h2>Регистрация</h2>
    <div class="login__inputs">
      <label for="email">{{ t('email') }}</label>
      <InputText type="email" v-model="store.email" />
      <label for="password">{{ t('password') }}</label>
      <Password v-model="store.password" toggle-mask />
    </div>
    <Button @click="store.createNewUser" :label="t('register')" />
  </div>
</template>

<style scoped lang="scss">
.login {
  &__wrappper {
    display: grid;
    place-items: center;
  }
  &__inputs {
    display: grid;
    gap: 1rem;
    padding-bottom: 1rem;
  }
}
</style>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const store = useUserStore()

const { t } = useI18n({
  inheritLocale: true,
  messages: {
    en: {
      email: 'Email',
      password: 'Password',
      register: 'Register',
    },
    ru: {
      email: 'Почта',
      password: 'Пароль',
      register: 'Зарегистрироваться',
    },
  },
})
</script>
