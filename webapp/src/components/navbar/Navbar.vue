<template>
  <nav class="navbar">
    <h1 class="title">Stock Simulator</h1>
    <form class="auth-form">
      <md-button
        class="md-primary"
        @click="login"
      >Login</md-button>
      <md-button
        class="md-primary md-raised"
        @click="signUp"
      >Sign up</md-button>
    </form>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    login () {
      this.router.push('/auth/login');
    },
    signUp () {
      this.router.push('/auth/signup');
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  width: 100%;
  background: #37123c;
  color: white;
  padding: 0px 5px 0px 5px;
  display: inline-block;
}

.title {
  float: left;
}

.auth-form {
  float: right;
}
</style>