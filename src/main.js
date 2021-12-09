import Vue from 'vue'
import App from '~/App.vue'
import store from './store'
import 'virtual:windi-utilities.css'
import router from '~/router'
import CompositionAPI from '@vue/composition-api'
Vue.use(CompositionAPI)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
