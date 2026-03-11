import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-dark-noir/theme.css'
import 'primeicons/primeicons.css'
import { createI18n } from 'vue-i18n'
import { PiniaColada } from '@pinia/colada'
import Ripple from 'primevue/ripple'

import App from './App.vue'
import router from './router'

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
app.use(PrimeVue, { ripple: true })
app.directive('ripple', Ripple)
app.use(i18n)

app.mount('#app')
