import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Info from "../views/Info.vue";
import Birthday from "../views/Birthday.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/birthday",
    name: "Birthday",
    component: Birthday,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/info",
    name: "Info",
    component: Info,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({ routes });

export default router;
