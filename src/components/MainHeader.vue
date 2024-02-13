<template>
    <div class="header">
        <Toolbar>
            <template #start>
                <Button link>
                    <img src="@/assets/images/PngItem_1379414_white.png" class="logo"/>
                </Button>
            </template>
            <template #end> 
                <SplitButton label="Сохранить" menuButtonIcon="pi pi-cog" @click="store.save()" :model="items" />
            </template>
        </Toolbar>
    </div>
</template>

<script setup>
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';

import { ref } from 'vue';
import {useCounterStore} from '@/stores/counter'

const store = useCounterStore();

const edit = store.edit()

const items = ref([{
        label: 'Загрузить последнюю сохраненную версию',
        icon: 'pi pi-refresh',
        command: () => alert('Загружено')
    },
    {
        label: 'Удалить',
        icon: 'pi pi-times',
        command: () => alert('Удалено')
    },
    {
        label: 'Загрузить JSON файл',
        icon: 'pi pi-upload',
        command: () => alert('Файл загружен')
    },
    {
        label: 'Создать нового персонажа',
        icon: 'pi pi-plus',
        command: () => alert('Создал нового')
    },
    {  
        label: 'Редактировать',
        icon: 'pi pi-file-edit',
        command: () => store.edit()
    }
]);
</script>

<style scoped>
    .logo{
        width:100px;
    }
    .header{
        margin-bottom: 10px;
    }
</style>