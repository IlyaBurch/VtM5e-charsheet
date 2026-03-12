import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import CharactersPage from '@/views/CharactersPage.vue'
import CharPage from '@/views/CharPage.vue'
import CharacterSheetPage from '@/views/CharacterSheetPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'registration',
      component: RegisterPage,
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersPage,
    },
    {
      path: '/new',
      name: 'new',
      component: CharPage,
    },
    {
      path: '/:id(\\d+)',
      name: 'character',
      component: CharPage,
    },
    {
      path: '/sheet',
      name: 'sheet',
      component: CharacterSheetPage,
    },
  ],
})

export default router
