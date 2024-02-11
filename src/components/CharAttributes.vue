<template>
    <div v-if="isEditing">
        <p>{{ props.name }}</p>
        <div>
            <p>{{ props.value }}</p>
        </div>
    </div>
    <div v-else class="attribute__li">
        <p>{{ name }}</p>
        <div>
            <InputNumber v-model="val"/>
        </div>
    </div>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber';
import { ref } from 'vue';

const props = defineProps(['name','value', 'isEditing'])

let name = ref(props.name);
let val = defineModel('value')
// let first = ref(null);

// let currentAttribute = attributes.arrAtributes;
// let currentNum = 0;

// console.log(currentAttribute)



</script>

<style scoped>
.attribute__li{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card{
    padding: 0;
}
</style>