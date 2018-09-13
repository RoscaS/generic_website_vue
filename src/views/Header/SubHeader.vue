<template>
  <div class="sub-header"
       v-scroll-reveal="{
                 origin: 'bottom',
                 distance:'20px',
                 duration: 2000,
                 delay: 500
               }">
    <span :class="{'highlighted': highlighted(4)}">
      {{ upper(state.city.data) }}
    </span> / DEPUIS
    <span :class="{'highlighted': highlighted(2)}">
      {{ state.oppening.data}}
    </span>
  </div>
</template>

<script>
	export default {
		name: "SubHeader",
    props: {
  			state: {type: Object}
  		},
    methods: {
  			highlighted(value) { return this.$parent.highlighted(value); },
  			upper(data) { return data.toUpperCase(); },
  		}
	};
</script>

<style scoped lang="scss">
  @import '../../scss/global';

  .sub-header {
    font-size: 20px;
    line-height: 30px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    color: $top-title;
    display: block;

    /*@media screen and (max-width: 690px) {*/
      /*font-size: 16px;*/
    /*}*/
  }

</style>
