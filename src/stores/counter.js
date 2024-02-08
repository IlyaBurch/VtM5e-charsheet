import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
  const attributes = ref({
    strength: 3,
    dexterity: 2,
    stamina: 4,
    charisma: 5,
    manipulation: 1,
    composure: 2,
    intelligence: 3,
    wits: 3,
    resolve: 1,
  })
  return { attributes }
})
