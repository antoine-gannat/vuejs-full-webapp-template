<template>
  <div class="profile-links-container">
    <div class="img-wrapper">
      <img
        v-if="user.avatar"
        class="avatar"
        :src="user.avatar"
        :alt="user.username"
      >
    </div>
    <span>{{ user.username }}</span>
    <button
      class="btn btn-primary"
      @click="logout"
    >
      Logout
    </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProfileLink',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    logout() {
      axios.delete('/api/auth/').then(() => {
        // set user to null
        this.$store.commit('setUser', null)
        // if we are not already on the homepage,
        // redirect to it
        if (window.location.href.slice(window.location.href.indexOf('#')) != '#/'){
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped>
.profile-links-container{
  height:100%;
  line-height: 47px;
}

.btn{
  vertical-align: middle;
}

.avatar{
  width:50px;
}

.img-wrapper {
  display: inline-block; /* change the default display type to inline-block */
  overflow: hidden;      /* hide the overflow */
  height:100%;
  vertical-align: middle;
}

.img-wrapper img {
    transform:scale(1.5);
    -ms-transform:scale(1.5); /* IE 9 */
    -moz-transform:scale(1.5); /* Firefox */
    -webkit-transform:scale(1.5); /* Safari and Chrome */
    -o-transform:scale(1.5); /* Opera */
}

</style>