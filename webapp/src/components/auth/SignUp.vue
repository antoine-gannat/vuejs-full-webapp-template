<template>
  <div>
    <h3>Sign up</h3>
    <form @submit.prevent="signUp">
      <div class="form-group">
        <input
          v-model="email"
          name="email"
          type="text"
          class="form-control"
          placeholder="Your Email *"
          required
        >
      </div>
      <div class="form-group">
        <input
          v-model="username"
          name="username"
          type="text"
          class="form-control"
          placeholder="Your username *"
          required
        >
      </div>
      <div class="form-group">
        <input
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Your Password *"
          required
        >
      </div>
      <div class="form-group">
        <input
          v-model="passwordConfirmation"
          name="password-confirm"
          type="password"
          class="form-control"
          placeholder="Confirm your Password *"
          required
        >
      </div>
      <div class="form-group">
        <input
          type="submit"
          class="btn btn-primary submit-btn"
          value="Sign up"
        >
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "SignUp",
  data: () => {
    return {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    signUp () {
      if (this.password !== this.passwordConfirmation) {
        return this.$snotify.error('Passwords are not identical', 'Error !')
      }
      // call the api
      axios.post('/api/auth/signup/', {
        username: this.username,
        email: this.email,
        password: this.password
      }).then(response => {
        // set the user
        this.$store.commit('setUser', response.data.user)
        this.$snotify.success(response.data.message, 'Success !')
        // redirect to the dashboard
        this.$router.push('/dashboard')
      }).catch(err => {
        this.$snotify.error(err.response.data.message, 'Error !')
      })
    }
  }
}
</script>

<style>
</style>