import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Category from "../views/Category.vue";
import Youtube from "../views/Youtube.vue";
import Tiktok from "../views/TikTok.vue";
import Facebook from "../views/Facebook.vue";

import { Auth } from "../store/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  ,
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/youtube",
    name: "Youtube",
    component: Youtube,
    meta: {
      requiresAuth: true,
    },
    
  },
  {
    path: "/tiktok",
    name: "Tiktok",
    component: Tiktok,
    meta: {
      requiresAuth: true,
    },
    
  },
  {
    path: "/facebook",
    name: "Facebook",
    component: Facebook,
    meta: {
      requiresAuth: true,
    },
    
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // get current user info
  // const isLogin = Auth.state.isLogin;
  const isLogin = Auth.getters.loginStatus;

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isLogin) next("/login");
  else next();
});
export default router;
