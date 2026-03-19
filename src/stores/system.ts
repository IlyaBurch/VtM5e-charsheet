import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export type SystemId = 'vtm' | 'mork' | 'coc'

export interface SystemDef {
  id: SystemId
  name: string
  short: string
  accent: string
  theme: 'dark' | 'mork'
}

export const SYSTEMS: SystemDef[] = [
  { id: 'vtm',  name: 'Vampire: The Masquerade 5e', short: 'VtM 5e',    accent: '#ad0013', theme: 'dark' },
  { id: 'mork', name: 'Mork Borg',                  short: 'Mörk Borg', accent: '#ffee12', theme: 'mork' },
  { id: 'coc',  name: 'Call of Cthulhu',             short: 'CoC',       accent: '#4a7a9b', theme: 'dark' },
]

export const useSystemStore = defineStore('system', () => {
  const currentId = ref<SystemId>('vtm')

  const current = computed(() => SYSTEMS.find(s => s.id === currentId.value)!)

  function setSystem(id: SystemId) {
    currentId.value = id
    if (id === 'mork') {
      document.body.classList.add('mork')
    } else {
      document.body.classList.remove('mork')
    }
  }

  // Init theme class on store creation
  function init() {
    setSystem(currentId.value)
  }

  return { currentId, current, SYSTEMS, setSystem, init }
}, { persist: true })
