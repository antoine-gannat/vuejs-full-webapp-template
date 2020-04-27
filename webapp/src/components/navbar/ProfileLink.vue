<template>
  <div>
    <img
      v-if="user.avatar"
      :src="user.avatar"
      :alt="user.username"
    >
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
        this.$store.commit('setUser', null)
      })
    }
  }
}
</script>