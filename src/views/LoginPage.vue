<template>
  <div class="login__wrappper">
    <h2>Авторизация</h2>
    <div class="login__inputs">
      <label for="email">{{ t('email') }}</label>
      <InputText type="email" v-model="email" id="email" @keyup.enter="handleLogin" />
      <label for="password">{{ t('password') }}</label>
      <Password v-model="password" id="password" toggle-mask @keyup.enter="handleLogin" />
    </div>
    <Button @click="handleLogin" :label="t('login')" :loading="asyncStatus === 'loading'" />
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
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoginMutation } from '@/composables/useAuth'
import { useI18n } from 'vue-i18n'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref('')
const password = ref('')

const { mutate, asyncStatus } = useLoginMutation()

const handleLogin = () => mutate({ email: email.value, password: password.value })

const { t } = useI18n({
  inheritLocale: true,
  messages: {
    en: {
      email: 'Email',
      password: 'Password',
      login: 'Enter',
    },
    ru: {
      email: 'Почта',
      password: 'Пароль',
      login: 'Войти',
    },
  },
})
</script>
