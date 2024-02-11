<template>
    <div>
        <Toolbar>
            <template #start>
                <Button icon="pi pi-plus"/>
            </template>

            <template #end> <SplitButton label="Save" icon="pi pi-check" :model="items"></SplitButton></template>
            
        </Toolbar>
        <!-- TODO: тулбар перенести в хэдер в роутере -->
        <InputSwitch v-model="isEditing"/>
        <div class="card flex justify-content-center">
        <Panel toggleable collapsed>
            <template #header>
                <div class="flex align-items-center gap-3">
                    <Avatar label="V" size="large" shape="circle" />
                    <span class="font-bold">{{name}}</span>
                </div>
            </template>
            <p>Клан - {{ clan }}</p>
            <p>Хроника - {{ lorem }}</p>
            <p>Сир - {{ lorem }}</p>
            <p>Концепция - {{ lorem }}</p>
            <p>Цель - {{ lorem }}</p>
            <p>Прихоть - {{ lorem }}</p>
            <p>Стиль охоты - {{ lorem }}</p>
            <p>Поколение - {{ lorem }}</p>
        </Panel>
        <Panel toggleable collapsed>
            <template #header>
                Здоровье и голод
            </template>
            <CommonList :commons="attributes.commons"/>
        </Panel>
        <!-- <h3>
            Характеристики
        </h3> -->
        <Panel toggleable collapsed>
            <template #header>
                Харарктеристики
            </template>
            <AttributesList :attributes="attributes.attributes"/>
        </Panel>
        <Panel toggleable collapsed>
            <template #header>
                Навыки
            </template>
            <AbilityList :abilities="attributes.abilities"/>
        </Panel>
    </div>
    </div>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter'
import Toolbar from 'primevue/toolbar'
import { ref } from 'vue';
import Button from 'primevue/button'
import SplitButton from 'primevue/splitbutton'
import Panel from 'primevue/panel'
import Avatar from 'primevue/avatar'
import InputSwitch from 'primevue/inputswitch';

import AttributesList from '@/components/AttributesList.vue';
import AbilityList from '@/components/AbilityList.vue';
import CommonList from '@/components/CommonList.vue';

const attributes = useCounterStore();

const items = ref([
    {
        label: 'Update',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    }
])

let isEditing = ref(true)
const name = 'Головач Лена';
const clan = 'бруха'
const lorem = 'lorem ipsum'
</script>

<style lang="scss" scoped>

</style>