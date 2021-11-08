import Vue from 'vue'
import App from '@/App.vue'
import { createApp, h, install } from "vue-demi"
import store from './store'
import 'virtual:windi.css'
import router from '@/router'
install()
Vue.config.productionTip = false
Vue.config.devtools = true
const app = createApp({
    router,
    store,
    render: () => h(App),
})
app.mount("#app")
