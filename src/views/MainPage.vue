<template>
    <div>
        <Toolbar>
            <template #start>
                <Button icon="pi pi-plus"/>
            </template>

            <template #end> <SplitButton label="Save" icon="pi pi-check" :model="items"></SplitButton></template>
        </Toolbar>
        <div class="card flex justify-content-center">
        <!-- <Card>
            <template #title>
                <p>{{ name }}</p>
            </template>
            <template #content>
                <p>Клан - {{ clan }}</p>
                <p>Концепция - {{ lorem }}</p>
            </template>
        </Card> -->
        <Panel toggleable>
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
        <!-- <h3>
            Характеристики
        </h3> -->
        <Panel toggleable>
            <template #header>
                Харарктеристики
            </template>
            <CharAttributes name="Сила" id="strength"/>
            <CharAttributes name="Ловкость" id="dexterity"/>
            <CharAttributes name="Выносливость" id="stamina"/>
            <CharAttributes name="Обаяние" id='charisma'/>
            <CharAttributes name="Манипуляция" id="manipulation"/>
            <CharAttributes name="Самообладание" id="composure"/>
            <CharAttributes name="Интеллект" id="intelligence"/>
            <CharAttributes name="Смекалка" id="wits"/>
            <CharAttributes name="Упорство" id='resolve'/>
        </Panel>
    </div>
    </div>
</template>

<script setup>
import Toolbar from 'primevue/toolbar'
import { ref } from 'vue';
import Button from 'primevue/button'
import SplitButton from 'primevue/splitbutton'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import Avatar from 'primevue/avatar'
import RadioButton from 'primevue/radiobutton'
import CharAttributes from '@/components/CharAttributes.vue';

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

const name = 'Головач Лена';
const clan = 'бруха'
const lorem = 'lorem ipsum'
</script>

<style lang="scss" scoped>

</style>