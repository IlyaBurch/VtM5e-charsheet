<template>
    <h1>Интерактивный лист персонажа для НРИ Vampire: the Masquerade</h1>
    <router-link to="/login">
        <Button label="Авторизоваться"/>
    </router-link>
    <router-link to="/register">
        <Button label="Зарегестрироваться"/>
    </router-link>
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style lang="scss" scoped>

</style>