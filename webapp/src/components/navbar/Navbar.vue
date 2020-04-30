<template>
  <nav class="navbar">
    <router-link to="/">
      <h1 class="navbar-title">
        template-webapp
      </h1>
    </router-link>
    <AuthLinks
      v-if="!this.$store.getters.user"
      class="float-right"
    />
    <ProfileLink
      v-else
      class="float-right"
    />
  </nav>
</template>

<script>
import AuthLinks from './AuthLinks'
import ProfileLink from './ProfileLink'
export default {
  name: 'Navbar',
  components: {
    AuthLinks,
    ProfileLink
  }
}
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

.navbar-title {
  color: white;
  float: left;
  font-size: 30px;
  padding-top: 7px;
}
</style>