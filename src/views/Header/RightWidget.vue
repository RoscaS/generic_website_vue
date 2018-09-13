<template>
  <div class="widget-wrapper"
       v-scroll-reveal="{
       origin: 'right',
       distance: '400px',
       duration: 1000,
       delay: 1500
       }">
    <span class="first-line" :class="{'highlighted': highlighted(3)}">
      {{ upper(state.adress.data) }}
    </span>
    <div class="second-line">
      <span :class="{'highlighted': highlighted(5)}">
        {{ state.post_code.data }}
      </span>
      &nbsp;
      <span :class="{'highlighted': highlighted(4)}">
       {{ upper(state.city.data) }}
      </span>
      <div class="contact-icons">
        <a class="no-tr" :href="adressHref" target="_blank">
          <i class="far fa-fw fa-map-marker-alt"></i>
        </a>
        <a class="no-tr" :href="mailHref" :title="state.mail.data">
          <i class="far fa-fw fa-envelope"></i>
        </a>
        <a class="no-tr" :href="phoneHref" :title="state.phone.data">
          <i class="far fa-fw fa-phone"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import SectionsStore from "../../components/Edit/Texts/SectionsStore";

export default {
  name: "RightWidget",
  props: {
    state: { type: Object }
  },
  computed: {
    siteContact() {
      return SectionsStore.getStore("SiteContact").state;
    },
    phoneHref() {
      return `tel:${this.state.phone.data}`;
    },
    mailHref() {
      return `mailto:${this.state.mail.data}`;
    },
    adressHref() {
      let adress = this.state.adress.data;
      let post = this.state.post_code.data;
      let city = this.state.city.data;
      let name = this.state.name.data;
      let google = "https://www.google.ch/maps/search/";
      return `${google}${name}+${adress}+${post}+${city}`;
    }
  },
  methods: {
    highlighted(value) {
      return this.$parent.highlighted(value);
    },
    upper(data) {
      return data.toUpperCase();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

.widget-wrapper {
  color: $top-text;
  font-size: 13px;
  padding: 10px 0 10px 0;
  border-top: 1px solid $accent;
  border-bottom: 1px solid $accent;
  height: 60px;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 230px;
  position: relative;
  z-index: 6;

  @media screen and (max-width: 1087px) {
    border-top: none;
    border-bottom: none;
  }

  .first-line {
    text-align: left;
    height: 20px;
  }

  .second-line {
    text-align: left;
    display: flex;
    align-items: center;

    .contact-icons {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 5px;

      a {
        margin-top: -2px;
        padding-right: 4px;
        position: relative;
        z-index: 15;
        font-size: 14px;
      }
    }
  }
}
</style>
