import Vue from "vue";
import VueRouter from "vue-router";
import Intro from "../views/Intro";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "intro",
    meta: { layout: "intro" },
    component: Intro
  },
  {
    path: "/home",
    name: "Главная",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Home.vue")
  },
  {
    path: "/weather",
    name: "Погода",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Weather.vue")
  },
  {
    path: "/todo",
    name: "Создать задачу",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Todo.vue")
  },
  {
    path: "/task",
    name: "Создать дело",
    meta: { layout: "main", auth: true },
    component: () => import("../views/Task.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "auth" },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "auth" },
    component: () => import("../views/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;
