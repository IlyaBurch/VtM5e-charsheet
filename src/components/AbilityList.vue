<template>
    <div>
        <CharAttributes v-for="(item, index) in abilities.abilities" :key="index" :name="item.ruName" v-model:value="item.value" v-model="item.value"/>
    </div>
</template>

<script setup>
import CharAttributes from './CharAttributes.vue';

let abilities = defineProps(['abilities']);
</script>

<style lang="scss" scoped>

</style>