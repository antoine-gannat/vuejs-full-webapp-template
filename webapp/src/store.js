import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user (state) {
      return (state.user);
    }
  },
  mutations: {
    setUser (state, user) {
      // eslint-disable-next-line no-console
      console.log("set user:", user);
      state.user = user;
    }
  },
  actions: {
  }
});

export default store;