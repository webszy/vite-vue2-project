import Vue from 'vue'
import App from '@/App.vue'
import { createApp, h } from "vue-demi"
import store from './store'
import 'virtual:windi.css'
import router from '@/router'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false
Vue.config.devtools = true
const app = createApp({
    router,
    store,
    render: () => h(App),
})
app.mount("#app")
