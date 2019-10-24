<template>
  <nav class="navbar">
    <router-link to="/">
      <h1 class="title">Stock Simulator</h1>
    </router-link>
    <form class="auth-form">
      <router-link to="/auth/signin">
        <md-button class="md-primary">Sign in</md-button>
      </router-link>
      <router-link to="/auth/signup">
        <md-button class="md-primary md-raised">Sign up</md-button>
      </router-link>
    </form>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.navbar {
  position: fixed;
  width: 100%;
  background: #37123c;
  color: white;
  top: 0;
  padding: 0px 5px 0px 5px;
  display: inline-block;
  height: 50px;
}

.title {
  color: white;
  float: left;
  font-size: 30px;
  padding-top: 7px;
}

.auth-form {
  float: right;
}
</style>