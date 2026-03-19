import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import AuthPage from '@/views/AuthPage.vue'
import CharactersPage from '@/views/CharactersPage.vue'
import CharPage from '@/views/CharPage.vue'
import MorkBorgPage from '@/views/MorkBorgPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
    },
    // Legacy redirects
    { path: '/login',    redirect: '/auth' },
    { path: '/register', redirect: '/auth' },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersPage,
    },
    {
      path: '/characters/new',
      name: 'new',
      component: CharPage,
    },
    {
      path: '/characters/:id(\\d+)',
      name: 'character',
      component: CharPage,
    },
    {
      path: '/morkborg',
      name: 'morkborg',
      component: MorkBorgPage,
    },
    // Legacy redirects
    { path: '/new',          redirect: '/characters/new' },
    { path: '/:id(\\d+)',    redirect: (to) => `/characters/${to.params.id}` },
    { path: '/sheet',        redirect: '/characters' },
  ],
})

export default router
