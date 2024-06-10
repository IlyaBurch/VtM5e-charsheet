<template>
    <h1 class="main__title">Интерактивный лист персонажа для НРИ Vampire: the Masquerade</h1>
    <section class="main__buttons">
        <router-link to="/login">
            <Button class="main__buttons--button" :label="t('buttons.login')"/>
        </router-link>
        <router-link to="/register">
            <Button class="main__buttons--button" :label="t('buttons.register')"/>
        </router-link>
    </section>
</template>

<script setup>
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
    inheritLocale: true,
    messages: {
        "en": {
            "title": "Interactive character sheet for TTRPG Vampire: the Masquerade",
            "buttons": {
                "login": "Login",
                "register": "Register"
            }
        },
        "ru": {
            "title": "Интерактивный лист персонажа для НРИ Vampire: the Masquerade",
            "buttons": {
                "login": "Авторизация",
                "register": "Регистрация"
            }
        }
    }
}) 
</script>

<style lang="scss" scoped>
.main{
    &__title{
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }
    &__buttons{
        display: grid;
        place-items: center;
        gap: 1rem;
        &--button{
            width: 15rem;
        }
    }
}
</style>