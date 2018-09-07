<template>
  <div class="">
    <div class="columns is-centered">
      <div :class="{'highlighted': highlighted(1)}"
           v-scroll-reveal="{
             origin: 'bottom',
             distance:'1px',
             duration: 2000,
             delay: 500
           }">
        <div class="header-ribbon">
          <span class="ribbon-text ">{{ upper(state.name_add.data) }}</span>
        </div>
      </div>
    </div>
    <div class="columns is-centered sub-header"
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
  </div>
</template>

<script>
	export default {
		name: "CenterWidget",
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
  @import "../../../static/sass/global";

  .header-ribbon {
    color: $ribbon-text;
    font-size: 28px;

    letter-spacing: 20px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: -30px;
    margin-bottom: 4px;

    @media screen and (max-width: 769px) {
      margin-top: -39px;
    }

    @media screen and (max-width: 690px) {
      margin-top: -30px;
      font-size: 20px;
    }


    .ribbon-text {
      z-index: 1;
      background: $ribbon;
      padding-left: 20px;
      padding-top: 4.5px;
      padding-bottom: 2px;

      @media screen and (max-width: 690px) {
        padding-bottom: 1.5px;
      }
    }

    &:before,
    &:after {
      content: "";
      width: 0.2em;
      border: .87em solid $ribbon;
      z-index: 0;

      @media screen and (max-width: 690px) {
        border: .9em solid $ribbon;
      }

    }

    &:before {
      top: -20px;
      left: -1em;
      border-right-width: 0.95em;
      border-left-color: transparent;
    }

    &:after {
      top: -20px;
      right: -1em;
      border-left-width: 0.95em;
      border-right-color: transparent;
    }
  }

  .sub-header {
    font-size: 20px;
    line-height: 30px;
    text-decoration: none solid rgb(61, 91, 149);
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    color: $top-title;
    display: block;

    @media screen and (max-width: 690px) {
      font-size: 16px;
    }

  }


</style>
