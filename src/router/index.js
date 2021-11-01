import Vue from "vue"
import Index from "@/views/Index.vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "Home",
        component: Index
    }
]
export default new VueRouter({
    scrollBehavior: () => ({
        y: 0,
        x: 0,
    }),
    base: "/",
    mode: "hash",
    routes,
})
