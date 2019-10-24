import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';

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
            state.user = user;
        }
    },
    actions: {
        login (state, credentials) {
            axios.post('/auth/login', credentials).then((response) => {
                state.commit('setUser', response.data);
                this.$snotify.success('Logged in !');
            }).catch((err) => {
                this.$snotify.error(err.data);
            });
        }
    }
});

export default store;