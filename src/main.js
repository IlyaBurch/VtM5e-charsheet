import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-dark-noir/theme.css'
import 'primeicons/primeicons.css'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  // messages: {
  //   en: require('./i18n/en.json')
  // }
})

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(PrimeVue)
app.use(i18n)
app.use(pinia)

app.mount('#app')
