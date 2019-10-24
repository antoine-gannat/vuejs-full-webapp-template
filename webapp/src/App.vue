<template>
  <div id="app">
    <Navbar />
    <HomePage />
  </div>
</template>

<script>
import HomePage from './pages/HomePage.vue'
import Navbar from './components/navbar/Navbar';

export default {
  name: 'app',
  components: {
    HomePage,
    Navbar
  }
}
</script>

<style>
/* COLORS: https://coolors.co/37123c-71677c-a99f96-dda77b-945d5e */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
