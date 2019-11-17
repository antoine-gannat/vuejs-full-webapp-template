<template>
  <div>
    <h3>Sign up</h3>
    <form>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Your Email *"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Your Password *"
          v-model="password"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Confirm your Password *"
          v-model="passwordConfirmation"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="submit"
          class="btn btn-primary submit-btn"
          value="Sign up"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: () => {
    return {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }
};
</script>

<style>
</style>