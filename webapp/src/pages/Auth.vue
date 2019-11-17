<template>
  <main>
    <h2>Authentication</h2>
    <section class="container login-container">
      <div class="row">
        <SignIn />
        <SignUp />
      </div>
    </section>
  </main>
</template>

<script>
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
export default {
  name: "auth",
  components: {
    SignIn,
    SignUp
  }
};
</script>

<style scoped>
</style>