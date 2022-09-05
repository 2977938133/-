import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";
import { useStore } from "../pinia/index";
import { storeToRefs } from "pinia";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // children: [{ path: '', component: Home }],
  },
  {
    path: "/ItemMusic",
    name: "ItemMusic",
    component: () => import("../views/ItemMusic.vue"),
  },
  {
    path: "/Search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/infoUser",
    name: "infoUser",
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token") || "";
      console.log(token);
      
      if (token) {
        if(token == ''){
          next('/Login')
        }else{
          next()
        }
      }
       else {
        next('/Login')
      }
    },
    component: () => import("../views/infoUser.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from) => {
  const { isshowfootermusic } = storeToRefs(useStore());
  if (to.path == "/Login") {
    isshowfootermusic.value = false;
  } else {
    isshowfootermusic.value = true;
  }
});
export default router;
