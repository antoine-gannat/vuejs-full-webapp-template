<template>
  <main>
    <h1>{{ user.username }}'s Dashboard</h1>
    <p>This is the dashboard, only available to logged users.</p>
  </main>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Dashboard',
  computed:{
    ...mapGetters(['user'])
  }
}
</script>

<style>
</style>