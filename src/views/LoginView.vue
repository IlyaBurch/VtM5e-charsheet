<template>
    <div>
        <InputText type="email" v-model="email" placeholder="Почта"></InputText>
        <Password v-model="password" :feedback="false" toggleMask placeholder="Пароль"></Password>
        <Button @click="logIn(email, password)">Submit</Button>
    </div>
    <div>{{ isLogged }}</div>
</template>

<script setup>
import InputMask from 'primevue/inputmask';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/init.js'

import { ref } from 'vue';

let email = ref(null);
let password = ref(null);
let isLogged = ref('Залогинься')

// function login() {
//       // login user
//       signInWithEmailAndPassword(auth,email.value,password.value)
//       .then(() => {
//         // emit event for member area
//         isLogged.value = true;
//       })
//     }

async function logIn(email, password ){
        const response = await signInWithEmailAndPassword(auth, email, password)
        if (response) {
            // context.commit('SET_USER', response.user)
            isLogged.value='нихуя себе, у тебя получилось'
        } else {
            throw new Error('login failed')
        }
    }
</script>

<style lang="scss" scoped>

</style>