<template>
  <div>
    <h3>Sign in</h3>
    <form @submit.prevent="signIn">
      <div class="form-group">
        <input
          v-model="formEmail"
          type="email"
          name="email"
          class="form-control"
          placeholder="Your Email *"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="formPassword"
          type="password"
          name="password"
          class="form-control"
          placeholder="Your Password *"
          required
        />
      </div>
      <div class="form-group">
        <a href="#" class="forget-passwd-link">Forgot your password?</a>
      </div>
      <div class="form-group">
        <input type="submit" class="btn btn-primary submit-btn" value="Sign in" />
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";

export default {
  name: "SignIn",
  data: () => {
    return {
      formEmail: "",
      formPassword: ""
    };
  },
  methods: {
    signIn() {
      axios
        .post("/api/auth/signin/", {
          email: this.formEmail,
          password: this.formPassword
        })
        .then(response => {
          this.$store.commit("setUser", response.data.user);
          this.$snotify.success(response.data.message);
          this.$router.push(this.$route.query.redirect || "/dashboard");
        })
        .catch(err => {
          this.$snotify.error(err.response.data.message, "Error !");
        });
    }
  }
};
</script>

<style scoped>
.forget-passwd-link {
  color: white !important;
}
</style>