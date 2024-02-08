<template>
    <Card class="card">
        <template #content>
            <div class="attribute__li">
                <p>{{ props.name }}</p>
                <div>
                    <RadioButton v-model="first" :value="true"/>
                    <RadioButton/>
                    <RadioButton/>
                    <RadioButton/>
                    <RadioButton/>
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup>
import Button from 'primevue/button'
import SplitButton from 'primevue/splitbutton'
import Card from 'primevue/card'
import Panel from 'primevue/panel'
import Avatar from 'primevue/avatar'
import RadioButton from 'primevue/radiobutton'
import { computed, ref } from 'vue'
import {useCounterStore} from '@/stores/counter'

const props = defineProps(['name', 'id'])
const attributes = useCounterStore();
let first = ref(null);

let currentAttribute = attributes.attributes
let currentNum = 0;

console.log(currentAttribute)



</script>

<style scoped>
.attribute__li{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>