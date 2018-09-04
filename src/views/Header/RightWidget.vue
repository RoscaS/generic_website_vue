<template>
  <div class="right-side"
       v-scroll-reveal="{
       origin: 'right',
       distance: '400px',
       duration: 1000,
       delay: 1500
       }">
    <span class="first-line" :class="{'highlighted': highlighted(3)}">
      {{ upper(state.adress.data) }}
    </span>
    <span class="second-line">
    <span :class="{'highlighted': highlighted(5)}">
      {{ state.post_code.data }}
    </span>
    <br>
    <span :class="{'highlighted': highlighted(4)}">
     {{ upper(state.city.data) }}
    </span>
    , tel.:
    <a class="phone"
       :class="{'highlighted': highlighted(6)}"
       :href="phoneHref">
      {{state.phone.data}}
    </a>
  </span>
  </div>
</template>

<script>
	export default {
		name: "RightWidget",
		props: {
			state: {type: Object}
		},
		methods: {
			highlighted(value) { return this.$parent.highlighted(value); },
			upper(data) { return data.toUpperCase(); },
		},
    computed: {
      phoneHref() {
				return `tel:${this.state.phone}`;
			}
    }
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .right-side {
    color: $top-text;
    font-size: 13px;
    padding: 10px 0 10px 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    text-align: left;

    @media screen and (max-width: 915px) {
      border-top: none;
      border-bottom: none;
    }

    a {
      font-size: 14px;
      line-height: 19.5px;
    }
  }

</style>
