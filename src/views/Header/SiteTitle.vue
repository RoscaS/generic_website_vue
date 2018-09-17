<template>
  <div class="site-title"
       :class="{'highlighted': highlighted(0)}"
       v-scroll-reveal="{
        origin: 'top',
        duration: 1000,
        delay: 500
       }">
    <img class="logo"
         v-if="logo"
         :src="logo"
         v-scroll-reveal="{
             origin: 'bottom',
             distance:'20px',
             duration: 2000,
             delay: 500
           }"/>
    <span v-else>{{ state.name.data }}</span>

  </div>
</template>

<script>
import GalleriesStore from "../../components/Edit/Galleries/GalleriesStore";

export default {
  name: "SiteTitle",
  props: {
    state: { type: Object }
  },
  computed: {
    logo() {
      return GalleriesStore.logo;
    }
  },
  methods: {
    highlighted(value) {
      return this.$parent.highlighted(value);
    }
  }
};
</script>



<style scoped lang="scss">
@import "../../scss/global";
@import url("https://fonts.googleapis.com/css?family=Delius");

.logo {
  width: 450px;
  height: auto;
  @media screen and (max-width: $logo-breakpoint) {
    width: $logo-mobile-width;
    margin-left: $logo-mobile-margin;
  }
  @media screen and (max-width: 400px) {
    width: 275px;
    margin-left: $logo-mobile-margin;
  }
}

.site-title {
  /*<!--font-family: $top-title-font;-->*/
  position: relative;
  z-index: 2;
  font-family: Delius, cursive;
  letter-spacing: $top-title-letter-spacing;
  font-size: 130px;
  text-align: center;
  color: $top-title;
  margin-right: -20px; // contre balance letter-sp de la dernière lettre.

  @media screen and (max-width: $logo-breakpoint) {
    font-size: 100px;
    /* trigger point for mobile */
  }
}
</style>
