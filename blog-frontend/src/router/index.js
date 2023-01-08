import { createWebHistory, createRouter } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/postDetail/:id",
    name: "postDetail",
    component: () => import("../views/PostDetail.vue"),
  },
  {
    path: "/postEdit/:id",
    name: "postEdit",
    component: () => import("../views/PostEdit.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
