<template>
  <div class="login__wrappper">
    <h1>Введите почту и пароль:</h1>
    <div>
        <InputText type="email" v-model="store.email" />
        <Password v-model="store.password"/>
    </div>
    <Button @click="store.handleLogin" label="Залогиниться"/>
  </div>
</template>

<style scoped>
    .login__wrappper{
        display: grid;
        place-items: center;
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

// function login(){
//     store.handleLogin();
//     router
// }

</script>
