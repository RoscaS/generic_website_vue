<template>

</template>

<script>
  import auth from '../auth';

	export default {
		name: "Login",
    data: () => ({
    }),
    methods: {
    },
    mounted() {
			if (this.$auth.isAuthenticated()) {
        this.$router.push({name: 'home'});
      } else {
        this.$auth.login()
      }
    }
	};
</script>

<style scoped>

</style>
