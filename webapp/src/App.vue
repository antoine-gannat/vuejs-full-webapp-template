<template>
  <div id="app">
    <Navbar />
    <router-view />
    <vue-snotify />
  </div>
</template>

<script>
import Navbar from "./components/navbar/Navbar"

export default {
  name: "App",
  components: {
    Navbar
  }
}
</script>

<style>
@import "~vue-snotify/styles/material.css";
body {
  background: rgb(221, 167, 123);
  background: linear-gradient(
    180deg,
    rgba(221, 167, 123, 1) 0%,
    rgba(148, 93, 94, 1) 100%
  );
}
/* COLORS: https://coolors.co/37123c-71677c-a99f96-dda77b-945d5e */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* Add a padding top to avoid hidding elements behind the navbar */
  padding-top: 50px;
}
</style>
