import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginPage  from '../views/LoginPage.vue'
// import {useUserStore} from "../stores/user";
// const store = useUserStore();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Main",
      component: LoginPage
    },
    {
      path: '/char',
      name: 'char',
      component: MainPage
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
