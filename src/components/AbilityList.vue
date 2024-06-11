<template>
    <div>
        <CharAttributes v-for="(item, index) in store.character.abilities" :key="index" :name="item.ruName" v-model:value="item.value"/>
    </div>
</template>

<script setup>
import CharAttributes from './CharAttributes.vue';

let abilities = defineProps(['abilities']);
import { useCharacterStore } from '@/stores/character';
const store = useCharacterStore();
</script>

<style lang="scss" scoped>

</style>