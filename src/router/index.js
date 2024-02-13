import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginHelper from '@/components/firebase/LoginHelper.vue'
import { auth } from "@/components/firebase/firebase.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage
    },
    {
      path: "/login",
      name: "Login",
      component: LoginHelper
    }
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

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router
