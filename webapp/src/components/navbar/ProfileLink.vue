<template>
  <div>
    <img
      :src="user.avatar"
      :alt="user.username"
    />
    <span>{{user.username}}</span>
  </div>
</template>

<script>
export default {
  name: 'ProfileLink',
  computed: {
    user () {
      return (this.$store.getters.user);
    }
  }
}
</script>