<template>
  <img class="logo"
       v-if="logo"
       :src="logo"
       v-scroll-reveal="{
           origin: 'bottom',
           distance:'20px',
           duration: 2000,
           delay: 500
         }"/>
  <div v-else
       class="site-title"
       :class="{'highlighted': highlighted(0)}"
       v-scroll-reveal="{
        origin: 'top',
        duration: 1000,
        delay: 500
       }">
    <span>{{ state.name.data }}</span>
  </div>
</template>

<script>
  import GalleriesStore from "../../components/Edit/Galleries/GalleriesStore";

	export default {
		name: "SiteTitle",
		props: {
			state: {type: Object}
		},
    computed: {
	    logo() { return GalleriesStore.logo; },
    },
		methods: {
			highlighted(value) { return this.$parent.highlighted(value); },
		}
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .logo {
    margin-top: 50px;
    width: 450px;
    height: auto;
  }

  .site-title {
    font-family: $top-title-font;
    letter-spacing: $top-title-letter-spacing;
    font-size: 130px;
    text-align: center;
    color: $top-title;
    margin-right: -20px;  // contre balance letter-sp de la dernière lettre.

    @media screen and (max-width: 560px) {
      /* trigger point for mobile */
    }
  }

</style>
