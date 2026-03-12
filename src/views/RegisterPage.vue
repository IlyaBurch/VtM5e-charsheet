<template>
  <div class="login__wrappper">
    <h2>Регистрация</h2>
    <div class="login__inputs">
      <label for="email">{{ t('email') }}</label>
      <InputText type="email" v-model="email" />
      <label for="password">{{ t('password') }}</label>
      <Password v-model="password" toggle-mask />
    </div>
    <Button @click="handleRegister" :label="t('register')" :loading="asyncStatus === 'loading'" />
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
