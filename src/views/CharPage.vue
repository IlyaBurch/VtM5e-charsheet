<template>
    <div>
        <!-- <Button @click="store.uploadJSONToSupabase" label="Upload"/> -->
        <Button v-if="!charStore.isEdit" @click="charStore.edit" label="Edit"/>
        <Button v-if="charStore.isEdit" @click="charStore.save" label="Save"/>
        <div class="card flex justify-content-center">
        <Panel toggleable collapsed>
            <template #header>
                <div class="flex align-items-center name">
                    <img src="@/assets/images/PngItem_939270.png" class="vtm-logo"/>
                    <InputText v-if='charStore.isEdit' size='small' class="input__text" v-model="charStore.character.charName"/>
                    <span v-else class="font-bold">{{charStore.character.charName}}</span>
                </div>
            </template>
            <MainInfo :mainInfo="charStore.character.mainInfo"/>
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
            <AttributesList :attributes="charStore.character.attributes"/>
        </Panel>

        <Panel toggleable collapsed>
            <template #header>
                Навыки
            </template>
            <AbilityList :abilities="charStore.character.abilities"/>
        </Panel>

        <Panel toggleable collapsed>
            <template #header>
                <span>Дисциплины</span>
            </template>
            <DisciplinesList :disciplines="charStore.character.disciplines"/>
        </Panel>

    </div>
    </div>
</template>

<script setup>
import {useCounterStore} from '@/stores/counter'
import { useCharacterStore } from '@/stores/character';

import Panel from 'primevue/panel'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import AttributesList from '@/components/AttributesList.vue';
import AbilityList from '@/components/AbilityList.vue';
import CommonList from '@/components/CommonList.vue';
import MainInfo from '@/components/MainInfo.vue';
import DisciplinesList from '@/components/DisciplinesList.vue'

import { useI18n } from 'vue-i18n'

const store = useCounterStore();

const charStore = useCharacterStore();

const name = 'Головач Лена';



const { t } = useI18n({
    inheritLocale: true,
    messages: {
        "en": {
            email: "Email",
            password: "Password",
            login: "Enter",
        },
        "ru": {
            email: "Почта",
            password: "Пароль",
            login: " Войти",
        }
    }
})

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