import Vue from 'vue'
import App from './App.vue'
import Snotify from 'vue-snotify'
import router from './router'
import store from './store'
import axios from 'axios'

// Vue snotify
Vue.use(Snotify)

Vue.config.productionTip = false

new Vue({
  mounted(){
    // check if the user is already connected
    // and if so, get it's informations
    axios.get('/api/users/myself/').then((userInfo) => {
      this.$store.commit('setUser', userInfo.data)
    })
    .catch(() => {
      this.$store.commit('setUser', null)
    })
  },
  render: h => h(App), 
  store,
  router
}).$mount('#app')
