<template>
  <transition name="fadeRight" appear>
    <a class="no-tr" href="#" @click="logOut" v-if="$auth.isAuthenticated()">
      <i class="fal fa-fw fa-sign-out-alt"></i>
      <span>Déconnexion</span>
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
    animation-delay: .9s;
  }

  a {
    font-size: 14px !important;
    @media screen and (max-width: 1087px) {
      font-size: 30px !important;
    }
    i {
      padding-right: 15px;
      @media screen and (max-width: 1087px) {
        padding-right: 0;
        margin-left: 4px;
      }
    }
    span {
      @media screen and (max-width: 1087px) {
        padding-left: 4px;
      }
    }
  }
</style>
