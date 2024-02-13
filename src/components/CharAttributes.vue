<template>

    <div v-if="store.isEdit" class="attribute__li">
        <p>{{ props.name }}</p>
        <div v-if="isNumber">
            <InputNumber v-model="val" showButtons :min="0" :max="10" buttonLayout="horizontal" :inputStyle="{'width' : '50px'}"/>
        </div>
        <div v-else>
            <Rating v-model="val" :stars="amount">
                <template #officon>
                    <img src="@/assets/images/gui-form-checkbox-svgrepo-com.png" height="15" width="15">
                </template>
                <template #onicon>
                    <img src="@/assets/images/_filled_gui-form-checkbox-svgrepo-com.png" height="15" width="15"/>
                </template>
            </Rating>
        </div>
    </div>
    
    <div v-else class="attribute__li">
        <p>{{ props.name }}</p>
        <div v-if="isNumber">
            <InputNumber v-model="val" showButtons :min="0" :max="10" buttonLayout="horizontal" :inputStyle="{'width' : '50px'}"/>
        </div>
        <div v-else>
            <Rating v-model="val"  readonly :cancel="false" :stars="amount">
                <template #officon>
                    <img src="@/assets/images/gui-form-checkbox-svgrepo-com.png" height="15" width="15">
                </template>
                <template #onicon>
                    <img src="@/assets/images/_filled_gui-form-checkbox-svgrepo-com.png" height="15" width="15"/>
                </template>
            </Rating>
        </div>
    </div>
</template>

<script setup>
import Rating from 'primevue/rating';
import { useCounterStore } from '@/stores/counter';

import InputNumber from 'primevue/inputnumber';

const store = useCounterStore()

import { ref } from 'vue';

const props = defineProps({
    name : String,
    value : Number, 
    isEditing : Boolean,
    isNumber : {
        type: Boolean,
        default: false,
    },
    amount : {
        type : Number,
        default : 5,
    },
})

let val = defineModel('value')

</script>

<style scoped>
.attribute__li{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.input__number{
    width: 50px;
}
</style>