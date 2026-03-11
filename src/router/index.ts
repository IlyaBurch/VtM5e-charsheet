import { createRouter, createWebHistory } from 'vue-router'
import CharPage from '../views/CharPage.vue'
import LoginPage from '../views/LoginPage.vue'
import MainPage from '@/views/MainPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainPage,
    },
    {
      path: '/char',
      name: 'char',
      component: CharPage,
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
  ],
})

export default router
