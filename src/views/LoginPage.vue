<template>
  <div class="login__wrappper">
    <h2>Авторизация</h2>
    <div class="login__inputs">
        <label for="email">{{ t('email')}}</label>
        <InputText type="email" v-model="store.email" id="email"/>
        <label for="password">{{ t('password')}}</label>
        <Password v-model="store.password" id="password" toggle-mask/>
    </div>
    <Button @click="store.handleLogin" @keyup.enter="store.handleLogin" :label='t("login")'/>
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
            login: "Enter",
        },
        "ru": {
            email: "Почта",
            password: "Пароль",
            login: " Войти",
        }
    }
})


// function login(){
//     store.handleLogin();
//     router
// }

</script>
