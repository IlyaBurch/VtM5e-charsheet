<template>
    <div class="login__wrappper">
      <h1>Регистрация</h1>
      <h2>Введите почту и пароль:</h2>
      <div>
          <InputText type="email" v-model="store.email" />
          <Password v-model="store.password"/>
      </div>
      <Button @click="store.createNewUser" label="Залогиниться"/>
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