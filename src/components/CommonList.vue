<template>
    <!-- <div>
        <CharAttributes v-for="item in commons.commons" :key="item.id" :name="item.name" v-model:value="item.value"/>
    </div> -->
    <CharAttributes :name="'Здоровье'" v-model:amount="charStore.character.common.maxHealth" v-model:value="charStore.character.common.health"/>
    <CharAttributes :name="'Макс. здоровье'" :isNumber="true" :amount="10" v-model:value="charStore.character.common.maxHealth"/>
    <CharAttributes :name="'Воля'" v-model:amount="charStore.character.common.maxWill" v-model:value="charStore.character.common.will"/>
    <CharAttributes :name="'Макс. воля'" :isNumber="true" :amount="10" v-model:value="charStore.character.common.maxWill"/>
    <CharAttributes :name="'Человечность'" v-model:amount="charStore.character.common.maxHumanity" v-model:value="charStore.character.common.humanity"/>
    <CharAttributes :name="'Макс. человечность'" :isNumber="true" :amount="10" v-model:value="charStore.character.common.maxHumanity"/>
    <CharAttributes :name="'Голод'" v-model:value="charStore.character.common.hunger"/>
</template>

<script setup>
import CharAttributes from './CharAttributes.vue';

import { ref } from 'vue';

// const props = defineProps({
//     common : Object
// })

// import {useCounterStore} from '@/stores/counter'
import { useCharacterStore } from '@/stores/character';


// const store = useCounterStore();

const charStore = useCharacterStore();

</script>

<style lang="scss" scoped>

</style>