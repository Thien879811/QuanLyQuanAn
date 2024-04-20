import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import { faChild } from "@fortawesome/free-solid-svg-icons";
import authService from "@/services/auth.service";



const routes = [
    {
    path: "/",
    name: "login",
    component: Login,
    },

    {
        path: "/home",
        name: "home",
        component: Home,
        meta: { requiresAuth: true }
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/product",
        name: "addproduct",
        component: () => import("@/views/ProductAdd.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
        meta: { requiresAuth: true }
    },

    {
        path: "/order-history",
        name: "orderhistory",
        component: () => import("@/views/OrderHistory.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
        meta: { requiresAuth: true }
    },

    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: { requiresAuth: true },
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/store",
        name: "store",
        component: () => import("@/views/Store.vue"),
        meta: { requiresAuth: true },
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/edit_product",
        name: "editproduct",
        meta: { requiresAuth: true },
        component: () => import("@/views/EditProduct.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/logout",
        name: "logout",
        meta: { requiresAuth: true },
        component: () => import("@/views/Logout.vue"),
        props: true // Truyền các biến trong $route.params vào làm props
    },
        
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


router.beforeEach((to, from, next) => {
    const isAuthenticated =localStorage.getItem('token');
    if (to.meta.requiresAuth && !isAuthenticated) {
        confirm('Vui lòng đăng nhập')
        next('/'); // Chuyển hướng đến trang đăng nhập nếu người dùng chưa đăng nhập
    } else {
      next(); // Cho phép truy cập nếu đã đăng nhập hoặc không yêu cầu đăng nhập
    }
});

export default router;
