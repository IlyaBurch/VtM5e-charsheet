<template>
    <div class="header">
        <Toolbar>
            <template #start>
                <Button link>
                    <router-link to="/">
                        <img src="@/assets/images/PngItem_1379414_white.png" class="logo"/>
                    </router-link>
                </Button>
            </template>
            <template #end> 
                <!-- <SplitButton label="Сохранить" menuButtonIcon="pi pi-cog" @click="store.save()" :model="items" /> -->
                <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                <Menu v-if="store.isLog" ref="menu" id="overlay_menu" :model="itemsLogged" :popup="true">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                <span :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                            </a>
                        </router-link>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                    </template>
                </Menu>
                <Menu v-else ref="menu" id="overlay_menu" :model="items" :popup="true">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                                <span :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                            </a>
                        </router-link>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                    </template>
                </Menu>
            </template>
        </Toolbar>
    </div>
</template>

<script setup>
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
// import SplitButton from 'primevue/splitbutton';
import Menu from 'primevue/menu';

import { ref } from 'vue';
// import {useCounterStore} from '@/stores/counter'
import {useUserStore} from '@/stores/user'

const store = useUserStore()

const menu = ref()
const toggle = (event) => {
    menu.value.toggle(event);
};

const items = ref([
    // {
    //     label: 'Загрузить последнюю сохраненную версию',
    //     icon: 'pi pi-refresh',
    //     command: () => alert('Загружено')
    // },
    // {
    //     label: 'Удалить',
    //     icon: 'pi pi-times',
    //     route: '/'
    // },
    // {
    //     label: 'Загрузить JSON файл',
    //     icon: 'pi pi-upload',
    //     command: () => alert('Файл загружен')
    // },
    // {
    //     label: 'Создать нового персонажа',
    //     icon: 'pi pi-plus',
    //     command: () => alert('Создал нового')
    // },
    // {  
    //     label: 'Редактировать',
    //     icon: 'pi pi-file-edit',
    //     command: () => store.edit()
    // }
    {
        label: 'Авторизироваться',
        icon: 'pi pi-sign-in',
        route: '/'
    }
]);

const itemsLogged = ref([
    {
        label: 'Выйти из профиля',
        icon: 'pi pi-sign-out',
        command: () =>{
            store.logOut();
        },
        route: '/'
    }
])
</script>

<style scoped>
    .logo{
        width:100px;
    }
    .header{
        margin-bottom: 10px;
    }
</style>