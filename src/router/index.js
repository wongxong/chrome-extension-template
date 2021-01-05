import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignIn from "../views/users/sign_in.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/sign_in",
    name: "SignIn",
    component: SignIn
  }
];

const router = new VueRouter({
  mode: "abstract",
  routes
});

export default router;
