<template>

    <div v-if="store.isEdit" class="attribute__li">
        <p>{{ props.name }}</p>
        <div>
            <Rating v-model="val">
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
        <div>
            <Rating v-model="val"  readonly :cancel="false" >
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

const store = useCounterStore()

import { ref } from 'vue';

const props = defineProps(['name','value', 'isEditing'])

let name = ref(props.name);
let val = defineModel('value')

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