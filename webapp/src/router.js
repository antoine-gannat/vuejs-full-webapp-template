import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import store from './store';

Vue.use(VueRouter)

// redirect the user to the login page if he isn't authenticated
function authenticationCheck (to, from, next) {
  // check if a user exist in the store
  if (store.getters.user) {
    next();
  }
  // if not, redirect to login page
  else {
    // eslint-disable-next-line no-console
    next('/auth/login?redirect=' + to.fullPath);
  }
}

// redirect to the dashboard if logged
function toDashboardIfAuthenticated (to, from, next) {
  if (store.getters.user) {
    next('/dashboard');
  } else {
    next();
  }
}

export default new VueRouter({
  routes: [
    // Public routes
    {
      path: '/',
      component: HomePage,
      beforeEnter: toDashboardIfAuthenticated
    },
    {
      path: '/auth/:type',
      component: Auth
    },
    // Routes requiring an authentication
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: authenticationCheck
    }
  ]
});