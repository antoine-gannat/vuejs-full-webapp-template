<template>
  <form class="auth-links-container">
    <router-link to="/auth/signin">
      <button class="btn btn-primary">
        Sign in
      </button>
    </router-link>
    <router-link to="/auth/signup">
      <button class="btn btn-primary raised ml-2">
        Sign up
      </button>
    </router-link>
  </form>
</template>

<script>
export default {
  name: 'AuthLinks'
}
</script>

<style scoped>
.btn{
  vertical-align: middle
}
.auth-links-container{
  height:100%;
  line-height:47px;
}
</style>