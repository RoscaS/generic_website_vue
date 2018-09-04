<template>
  <div class="site-title"
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
	export default {
		name: "SiteTitle",
		props: {
			state: {type: Object}
		},
		methods: {
			highlighted(value) { return this.$parent.highlighted(value); },
		}
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .site-title {
    font-family: "Dancing Script", cursive, bold;
    font-size: 130px;
    letter-spacing: 0;
    text-align: right;
    color: $top-title;
    margin-bottom: -5px;
    z-index: 2;

    @media screen and (max-width: 690px) {
      font-size: 100px;
    }
  }

</style>
