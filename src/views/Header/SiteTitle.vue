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
    font-family: $top-title-font;
    letter-spacing: $top-title-letter-spacing;
    font-size: 130px;
    text-align: right;
    color: $top-title;
    margin-bottom: -10px;
    z-index: 3;

    @media screen and (max-width: 690px) {
      margin-top: $top-title-margin-top;
      font-size: $top-title-fontsize;
    }
  }

</style>
