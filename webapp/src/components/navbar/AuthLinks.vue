<template>
  <form>
    <router-link to="/auth/signin">
      <button class="btn btn-primary">
        Sign in
      </button>
    </router-link>
    <router-link to="/auth/signup">
      <button class="btn btn-primary raised">
        Sign up
      </button>
    </router-link>
  </form>
</template>

<script>
export default {
  name: 'AuthLinks'
}
</script>
