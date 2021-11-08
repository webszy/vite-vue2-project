// import Vue from 'vue'
import App from '@/App.vue'
import { createApp, h, install,Vue2 } from "vue-demi"
import store from './store'
import 'virtual:windi.css'
import router from '@/router'
install()
import VueCompositionApi from '@vue/composition-api'
Vue2.use(VueCompositionApi)
Vue2.config.productionTip = false
Vue2.config.devtools = true
const app = createApp({
    router,
    store,
    render: () => h(App),
})
app.mount("#app")
