<template>
  <div id="app">
    <!-- The navbar -->
    <Navbar />
    <!-- Content of the current page through the router -->
    <router-view v-if="user !== undefined" />
    <!-- Notifications component -->
    <vue-snotify />
  </div>
</template>

<script>
import Navbar from './components/navbar/Navbar'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed:{
    ...mapGetters(['user'])
  }
}
</script>

<style>
/* Style for vue-snotify */
@import "~vue-snotify/styles/material.css";

body {
  background: rgb(221, 167, 123);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* Add a padding top to avoid hidding elements behind the navbar */
  padding-top: 50px;
}
</style>
