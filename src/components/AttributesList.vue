<template>
    <div>
        <CharAttributes v-for="item in attributes.attributes" :key="item.id" :name="item.ruName" v-model:value="item.value"/>
    </div>
</template>

<script setup>
import CharAttributes from './CharAttributes.vue';

const attributes = defineProps({
    attributes: Object
});

</script>

<style lang="scss" scoped>

</style>