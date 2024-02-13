<template>
    <!-- <div>
        <CharAttributes v-for="item in commons.commons" :key="item.id" :name="item.name" v-model:value="item.value"/>
    </div> -->
    <CharAttributes :name="'Здоровье'" v-model:amount="store.common.maxHealth" v-model:value="store.common.health"/>
    <CharAttributes :name="'Макс. здоровье'" :isNumber="true" :amount="10" v-model:value="store.common.maxHealth"/>
    <CharAttributes :name="'Воля'" v-model:amount="store.common.maxWill" v-model:value="store.common.will"/>
    <CharAttributes :name="'Макс. воля'" :isNumber="true" :amount="10" v-model:value="store.common.maxWill"/>
    <CharAttributes :name="'Человечность'" v-model:amount="store.common.maxHumanity" v-model:value="store.common.humanity"/>
    <CharAttributes :name="'Макс. человечность'" :isNumber="true" :amount="10" v-model:value="store.common.maxHumanity"/>
    <CharAttributes :name="'Голод'" v-model:value="store.common.hunger"/>
</template>

<script setup>
import CharAttributes from './CharAttributes.vue';

import { ref } from 'vue';

import {useCounterStore} from '@/stores/counter'

const store = useCounterStore();


</script>

<style lang="scss" scoped>

</style>