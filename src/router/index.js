import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProductView from "../views/ProductView.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginView },

  {
    path: "/dashboard",
    component: DashboardView,
    children: [
      
      { path: "", redirect: "productos" },

      { path: "productos", component: ProductView },

      {
        path: "users",
        name: "users",
        component: () => import("../views/UserView.vue"),
        meta: { requiresAdmin: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const savedUser = JSON.parse(localStorage.getItem("currentUser"));


  if (to.meta.requiresAdmin) {
    if (!savedUser || savedUser.role !== "admin") {
      return next("/dashboard/productos");
    }
  }

  next();
});

export default router;
