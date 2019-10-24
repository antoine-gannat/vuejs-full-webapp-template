import Vue from 'vue'
import App from './App.vue'
import { MdButton } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import store from './store';
import Snotify from 'vue-snotify';
import router from './router';
Vue.use(Snotify);
Vue.use(MdButton)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
