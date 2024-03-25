import { createRouter, createWebHistory } from 'vue-router'
import CharPage from '../views/CharPage.vue'
import LoginPage  from '../views/LoginPage.vue'
import MainPage from '@/views/MainPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
// import {useUserStore} from "../stores/user";
// const store = useUserStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: MainPage
    },
    {
      path: '/char',
      name: 'char',
      component: CharPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'registration',
      component: RegisterPage
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (!store.isLog) {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router
