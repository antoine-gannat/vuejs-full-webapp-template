<template>
  <form>
    <router-link to="/auth/signin">
      <md-button class="md-primary">Sign in</md-button>
    </router-link>
    <router-link to="/auth/signup">
      <md-button class="md-primary md-raised">Sign up</md-button>
    </router-link>
  </form>
</template>

<script>
export default {
  name: 'AuthLinks'
}
</script>
