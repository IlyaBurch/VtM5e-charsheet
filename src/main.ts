import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import { PiniaColada } from '@pinia/colada'

import App from './App.vue'
import router from './router'
import { useSystemStore } from './stores/system'

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
})

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(PiniaColada)
app.use(router)
app.use(i18n)

// Init system theme (applies .mork class if needed)
const systemStore = useSystemStore()
systemStore.init()

app.mount('#app')
