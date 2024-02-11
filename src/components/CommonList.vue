<template>
    <div>
        <CharAttributes v-for="item in commons.commons" :key="item.id" :name="item.name" v-model:value="item.value"/>
    </div>
</template>

<script setup>
import CharAttributes from './CharAttributes.vue';

const commons = defineProps({
    commons: Object
});
</script>

<style lang="scss" scoped>

</style>