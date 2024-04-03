import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import Home from "@/views/Home.vue";


const routes = [
    {
    path: "/",
    name: "contactbook",
    component: ContactBook,
    },

    {
        path: "/home",
        name: "home",
        component: Home,
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
        props: true // Truyền các biến trong $route.params vào làm props
    },
    // {
    //     path: "/product",
    //     name: "home.product",
    //     component: () => import("@/views/Home.vue"),
    //     props: true // Truyền các biến trong $route.params vào làm props
    // },
        
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
