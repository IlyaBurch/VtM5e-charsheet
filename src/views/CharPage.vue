<template>
    <div>
        <!-- <Button @click="store.uploadJSONToSupabase" label="Upload"/> -->
        <Button @click="store.edit" label="Edit"/>
        <div class="card flex justify-content-center">
        <Panel toggleable collapsed>
            <template #header>
                <div class="flex align-items-center name">
                    <img src="@/assets/images/PngItem_939270.png" class="vtm-logo"/>
                    <InputText v-if='store.isEdit' size='small' class="input__text" v-model="store.charName"/>
                    <span v-else class="font-bold">{{name}}</span>
                </div>
            </template>
            <MainInfo :mainInfo="store.mainInfo"/>
        </Panel>

        <Panel toggleable collapsed>
            <template #header>
                Здоровье и голод
            </template>
            <CommonList/>
        </Panel>

        <Panel toggleable collapsed>
            <template #header>
                Харарктеристики
            </template>
            <AttributesList :attributes="store.attributes"/>
        </Panel>

        <Panel toggleable collapsed>
            <template #header>
                Навыки
            </template>
            <AbilityList :abilities="store.abilities"/>
        </Panel>

        <Panel toggleable collapsed>
            <template #header>
                <span>Дисциплины</span>
            </template>
            <DisciplinesList/>
        </Panel>

    </div>
    </div>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter'

import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import AttributesList from '@/components/AttributesList.vue';
import AbilityList from '@/components/AbilityList.vue';
import CommonList from '@/components/CommonList.vue';
import MainInfo from '@/components/MainInfo.vue';
import DisciplinesList from '@/components/DisciplinesList.vue'


const store = useCounterStore();

const name = 'Головач Лена';

</script>

<style scoped>
    .font-bold{
        font-weight: bold;
        padding-left: 15px;
    }
    
    .vtm-logo{
        height: 40px;
    }

    .name{
        display: flex;
        align-items: center;
    }

    .input__text{
    width: 180px;
}
</style>