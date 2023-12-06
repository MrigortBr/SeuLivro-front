import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/book/:uuid",
    name: "book",
    component: () => import("../views/BookView.vue"),
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/HistoryView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/search/:type",
    name: "search",
    component: () => import("../views/SearchView.vue"),
  },
  {
    path: "/invite/open/:code",
    name: "invite",
    component: () => import("../views/InviteView.vue"),
  },
  {
    path: "/store/:uuid",
    name: "StoreView",
    component: () => import("../views/StoreView.vue"),
  },
  {
    path: "/author/:uuid",
    name: "UserView",
    component: () => import("../views/UserView.vue"),
  },
  {
    path: "/myStore",
    name: "myStore",
    component: () => import("../views/MyStoreView.vue"),
  },
  {
    path: "/buy/:uuid",
    name: "buy",
    component: () => import("../views/PaymentView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
