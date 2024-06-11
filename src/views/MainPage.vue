<template>
    <h1 class="main__title">{{ t('title') }}</h1>
    <section class="main__info">
        <p>{{ t('info') }}</p>
        <p>{{ t('dev') }}</p>
    </section>
    <RouterLink to="/char" class="center">
        <Button class="main__buttons--button" :label="t('buttons.create')"/>
    </RouterLink>
    <!-- <section class="main__buttons">
        <router-link to="/login">
            <Button class="main__buttons--button" :label="t('buttons.login')"/>
        </router-link>
        <router-link to="/register">
            <Button class="main__buttons--button" :label="t('buttons.register')"/>
        </router-link>
    </section> -->
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
                "register": "Register",
                "create": "Create character"
            },
            "info": 'This unofficial website is created for non-commercial use and offers an interactive character sheet for the game "Vampires: the Masquerade".',
            "dev": 'At the moment, it is not possible to save characters, but the data in the sheet will not be lost when the page is reloaded'
        },
        "ru": {
            "title": "Интерактивный лист персонажа для НРИ Vampire: the Masquerade",
            "buttons": {
                "login": "Авторизация",
                "register": "Регистрация",
                "create": "Создать персонажа"
            },
            "info": 'Этот неофициальный сайт создан для некоммерческого использования и предлагает интерактивный лист персонажа для игры "Vampires: the Masquerade".',
            "dev" : 'В данный момент отсутствует возможность сохранения персонажей, но данные в листе при перезагрузке страницы не будут утеряны'
        }
    }
}) 
</script>

<style lang="scss" scoped>
.center{
    display: grid;
    place-items: center;
}
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
    &__info{
        text-align: center;
        max-width: fit-content;
        margin: 0 auto;
        padding-bottom: 10rem;
        padding-top: 3rem;
        padding-left: 4rem;
        padding-right: 4rem;
    }
}
</style>