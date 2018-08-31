<template>
<transition name="fadeRight" appear>

  <a class="no-tr" href="#" @click="logOut" v-if="$auth.isAuthenticated()">
    <i class="fal fa-fw fa-sign-out-alt"></i>
    Déconnexion
  </a>
</transition>
</template>

<script>
	export default {
		name: "Logout",
		methods: {
			logOut() {
				this.$auth.logout();
			}
		}
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .fadeRight-enter-active {
    animation-delay: 2s;
  }

  a {
    font-size: 14px !important;
  }
</style>
