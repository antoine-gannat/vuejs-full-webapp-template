import Vue from 'vue'
import App from './App.vue'
import Snotify from 'vue-snotify'
import router from './router'
import store from './store'

// Vue snotify
Vue.use(Snotify)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
