<template>
  <!--<div class="callback">Callback</div>-->
  <!--<transition name="fade">-->
    <!--<section class="hero is-warning is-fullheight" v-if="timer > 0">-->
      <!--<div class="hero-body">-->
        <!--<div class="container content">-->
          <!--<h1 class="title header">-->
            <!--<i class="fa fa-exclamation-triangle fa-2x"></i>-->
            <!--Utilisateur non autorisé.-->
          <!--</h1>-->
          <!--<h2 class="subtitle">-->
            <!--<a @click="redirect()">-->
              <!--Redirection-->
            <!--</a>-->
            <!--dans {{ timer }}-->
            <!--<span v-if="timer > 1">secondes</span>-->
            <!--<span v-else>seconde</span>-->
          <!--</h2>-->
        <!--</div>-->
      <!--</div>-->
    <!--</section>-->
  <!--</transition>-->
</template>

<script>
	export default {
		name: 'callback',
		data: () => ({
		}),
		methods: {
			redirect() {
				// window.location = window.location.origin
			},
			// autoRedirect(timer=5) {
			// 	this.timer = timer;
			// 	if (timer < 0) {
			// 		this.redirect();
			// 	} else {
			// 		setTimeout(() => {
			// 			this.autoRedirect(timer-1);
			// 		}, 1000);
			// 	}
			// }
		},
		mounted() {
			// this.autoRedirect();
			this.$auth.handleAuthentication().then(data => {
        this.$router.push({name: 'home'});
			});
		}
	};
</script>


<style scoped lang="scss">
  @import '../../static/sass/global';

  h1 {
    width: 100% !important;
    margin: 0 !important;
    text-align: left !important;
    line-height: 100px !important;
  }


</style>
options: {
	rememberLastLogin: false,
	auth: {
		sso: false,
		redirect: false
	}
}
