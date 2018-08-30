<template>
  <section class="section section-container" id="login">
    <div class="columns">
      <div class="column is-one-quarter">
        <form @submit.prevent="login">
          <p class="control">
            <input class="input" v-model="email" placeholder="email">
          </p>
          <p class="control">
            <input class="input" v-model="pass" placeholder="password" type="password">
          </p>
          <p>
            <button class="button" type="submit">Login</button>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
  import auth from '../auth';

	export default {
		name: "Login",
    data: () => ({
      email: '',
      pass: '',
    }),
    methods: {
			login() { auth.login(this.email, this.pass) }
    }
	};
</script>

<style scoped>

</style>
