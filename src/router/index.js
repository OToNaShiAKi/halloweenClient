import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Info from "../views/Info.vue";
import Rank from "../views/Rank.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
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
    path: "/info",
    name: "Info",
    component: Info,
  },
  {
    path: "/rank",
    name: "rank",
    component: Rank,
  },
  {
    path: "/game",
    name: "game",
    component: Game,
  },
  {
    path: "*",
    redirect: "/login",
  },
];

const router = new VueRouter({ routes });

export default router;
