<template>
  <div class="col-md-6">
    <h3>Sign in</h3>
    <form @submit.prevent="signIn">
      <div class="form-group">
        <input
          type="email"
          name="email"
          class="form-control"
          placeholder="Your Email *"
          v-model="formEmail"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          name="password"
          class="form-control"
          placeholder="Your Password *"
          v-model="formPassword"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="submit"
          class="btn btn-secondary"
          value="Sign in"
        />
      </div>
      <div class="form-group">
        <a href="#">Forget Password?</a>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios';

export default {
  name: "SignIn",
  data: () => {
    return {
      formEmail: '',
      formPassword: ''
    }
  },
  methods: {
    signIn () {
      axios.post('/api/auth/signin/', { email: this.formEmail, password: this.formPassword })
        .then((response) => {

          console.log(response.data.message);
          this.$store.commit('setUser', response.data.user);
          this.$snotify.success(response.data.message);
        }).catch((err) => {

          console.log(err.response.data.message);
          this.$snotify.error(err.response.data.message, 'Error !');
        });
    }
  }
};
</script>

<style>
</style>