import Vue from 'vue'
import VueRouter from 'vue-router'

// Components
import HomePage from './pages/HomePage';

Vue.use(VueRouter)

const routes = [
    { path: '/', component: HomePage }
]

const router = new VueRouter({
    routes
});

export default router;