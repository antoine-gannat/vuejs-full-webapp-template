import Vue from 'vue'
import App from './App.vue'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Snotify from 'vue-snotify'
// Import the router
import router from './router'
// Import the store
import store from './store'

// Vue snotify
Vue.use(Snotify)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
