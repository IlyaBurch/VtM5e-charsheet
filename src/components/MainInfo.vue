<template>
    <div>
        <TextAttributes v-for="item in mainInfo.mainInfo" :key="item.id" :name="item.name" v-model:value="item.value"/>
    </div>
</template>

<script setup>
import TextAttributes from './TextAttributes.vue';

const mainInfo = defineProps({
    mainInfo: Object
});

</script>

<style lang="scss" scoped>

</style>