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
    <br>
    <div class="second-line">
      <span :class="{'highlighted': highlighted(5)}">
        {{ state.post_code.data }}
      </span>
      &nbsp;
      <span :class="{'highlighted': highlighted(4)}">
       {{ upper(state.city.data) }}
      </span>
      <div class="icons">
        <a class="no-tr" :href="adressHref" target="_blank">
          <i class="fal fa-fw fa-map-marker-alt"></i>
        </a>
        <a class="no-tr" :href="mailHref" :title="state.mail.data">
          <i class="fal fa-fw fa-envelope"></i>
        </a>
        <a class="no-tr" :href="phoneHref" :title="state.phone.data">
          <i class="fal fa-fw fa-phone"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
	import TextsStore from "../../components/Edit/Texts/TextsStore";

	export default {
		name: "RightWidget",
		props: {
			state: {type: Object}
		},
		computed: {
      siteContact() { return TextsStore.getStore("SiteContact").state; },
			phoneHref() {return `tel:${this.state.phone.data}`;},
      mailHref() {return `mailto:${this.state.mail.data}`},
      adressHref() {
        let adress = this.state.adress.data;
        let post = this.state.post_code.data;
        let city = this.state.city.data;
        let name = this.state.name.data;
        let google = 'https://www.google.ch/maps/search/';
      	return `${google}${name}+${adress}+${post}+${city}`;
      }
		},
		methods: {
			highlighted(value) { return this.$parent.highlighted(value); },
			upper(data) { return data.toUpperCase(); },
		},
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
    .second-line {
      display: flex;
      flex-wrap: nowrap;
      text-align: center;
      .icons {
        margin-top: -1px;
        a {
          font-size: 14px;
          /*padding-left: 2.5px;*/
          padding-right: 2.5px;
          &:first-child {
            margin-left: 4px;
          }
          &:last-child {

          }
        }

      }
    }
  }

</style>
