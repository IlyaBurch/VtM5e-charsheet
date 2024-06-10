<template>
    <div class="login__wrappper">
      <h2>Регистрация</h2>
      <div class="login__inputs">
          <label for="email">{{ t('email') }}</label>
          <InputText type="email" v-model="store.email" />
          <label for="password">{{ t('password') }}</label>
          <Password v-model="store.password" toggle-mask/>
      </div>
      <Button @click="store.createNewUser" :label="t('register')"/>
    </div>
  </template>
  
  <style scoped lang="scss">
      .login{
          &__wrappper{
            display: grid;
            place-items: center;
          }
          &__inputs{
            display: grid;
            gap: 1rem;
            padding-bottom: 1rem;
          }
      }
  </style>
  
  <script setup>
  import { useUserStore } from '@/stores/user.js'
  import { ref } from  'vue';
  import { useRouter } from 'vue-router';
  
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  
  const store = useUserStore();
  const router = useRouter();

  import { useI18n } from 'vue-i18n'
const { t } = useI18n({
    inheritLocale: true,
    messages: {
        "en": {
            email: "Email",
            password: "Password",
            register: "Register",
        },
        "ru": {
            email: "Почта",
            password: "Пароль",
            register: "Зарегистрироваться",
        }
    }
})
  
  // function login(){
  //     store.handleLogin();
  //     router
  // }
  
  </script>