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
    base: "/",
    mode: "hash",
    routes,
})
