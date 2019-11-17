<template>
  <main>
    <section>
      <div class="authentication-block">
        <nav class="authentication-nav">
          <button
            @click.prevent="selectedPage = 'signin'"
            class="btn shadow-none"
            :class="{'selected': selectedPage === 'signin'}"
          >Sign in</button>
          <button
            @click.prevent="selectedPage = 'signup'"
            class="btn shadow-none"
            :class="{'selected': selectedPage === 'signup'}"
          >Sign up</button>
        </nav>
        <SignIn
          class="authentication-elem"
          v-if="selectedPage === 'signin'"
        />
        <SignUp
          class="authentication-elem"
          v-else
        />
      </div>
    </section>
  </main>
</template>

<script>
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
export default {
  name: "auth",
  data: () => {
    return {
      selectedPage: 'signin'
    }
  },
  methods: {
    initSelectedPage () {
      // get the selected page from the url
      if (this.$route.params.type === 'signup'
        || this.$route.params.type === 'signin') {
        this.selectedPage = this.$route.params.type;
      }
    }
  },
  watch: {
    $route () {
      this.initSelectedPage();
    }
  },
  mounted () {
    this.initSelectedPage();
  },
  components: {
    SignIn,
    SignUp
  }
};
</script>

<style>
.authentication-block {
  background: rgb(74, 30, 80);
  width: 600px;
  min-height: 400px;
  height: 50vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15vh;
  -webkit-box-shadow: 4px 3px 26px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 3px 26px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 4px 3px 26px -9px rgba(0, 0, 0, 0.75);
}
.authentication-nav {
  width: 100%;
  background: rgb(216, 216, 216);
}

.authentication-nav button {
  width: 50%;
  border-radius: 0;
  opacity: 0.5;
}

.authentication-nav .selected {
  background: rgb(74, 30, 80);
  color: white;
  opacity: 1;
}

.authentication-elem {
  padding: 2em;
  color: white;
}

.authentication-elem .submit-btn {
  width: 50%;
  margin-left: 25%;
}
</style>