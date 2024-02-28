<template>
    <h1>Интерактивный лист персонажа для НРИ Vampire: the Masquerade</h1>
    <Button link label="Авторизоваться">
        <router-link to="/login"/>
    </Button>
    <Button link label="Зарегестрироваться">
        <router-link to="/register"/>
    </Button>
    
</template>

<script setup>
import Button from 'primevue/button';
</script>

<style lang="scss" scoped>

</style>