<template>
  <div class="col-md-6">
    <h3>Sign in</h3>
    <form>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Your Email *" value />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Your Password *" value />
      </div>
      <div class="form-group">
        <input type="submit" class="btn btn-secondary" value="Sign in" />
      </div>
      <div class="form-group">
        <a href="#">Forget Password?</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignIn"
};
</script>

<style>
</style>