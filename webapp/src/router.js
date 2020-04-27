/* eslint-disable no-console */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import store from './store'

Vue.use(VueRouter)

// redirect the user to the login page if he isn't authenticated
function authenticationCheck (to, from, next) {
  // check the status of the user variable in the store
  // if it's set, continue
  // if not, go to the sign in page
  function proceed(){
    // check if a user exist in the store
    if (store.getters.user) {
      next()
    }else  {
      // if not, redirect to login page
      next('/auth/login?redirect=' + to.fullPath)
    }
  }
  // check if we have received the user data already
  if (store.getters.user === undefined){
    // watch the user value, and on change, proceed
    store.watch((state) => state.user,
    () => {
      proceed()
    })
  }
  else{
    // else if the value is already set, proceed
    proceed()
  }
}

// redirect to the dashboard if logged
function toDashboardIfAuthenticated (to, from, next) {
  if (store.getters.user) {
    next('/dashboard')
  } else {
    next()
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
})
