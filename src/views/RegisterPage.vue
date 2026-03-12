<template>
  <div class="grid place-items-center">
    <h2>Регистрация</h2>
    <div class="grid gap-4 pb-4">
      <label for="email">{{ t('email') }}</label>
      <InputText type="email" v-model="email" />
      <label for="password">{{ t('password') }}</label>
      <Password v-model="password" toggle-mask />
    </div>
    <Button @click="handleRegister" :label="t('register')" :loading="asyncStatus === 'loading'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRegisterMutation } from '@/composables/useAuth'
import { useI18n } from 'vue-i18n'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref('')
const password = ref('')

const { mutate, asyncStatus } = useRegisterMutation()

const handleRegister = () => mutate({ email: email.value, password: password.value })

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
