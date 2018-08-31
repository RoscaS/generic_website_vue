<template>

</template>

<script>
	export default {
		name: 'callback',
		data: () => ({
		}),
		mounted() {
			this.$auth.handleAuthentication().then(data => {
        this.$router.push({name: 'home'});
			});
		}
	};
</script>


<style scoped lang="scss">
</style>
