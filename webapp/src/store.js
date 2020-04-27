import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: undefined
  },
  getters: {
    user (state) {
      return (state.user)
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
  }
})

export default store
