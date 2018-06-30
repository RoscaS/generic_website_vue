<template>
  <div id="app">
    <PromoRibbon/>
    <Top/>
    <Navbar/>
    <Carousel :url="base + carousel"/>
    <Presentation :url="base + presentation"/>
    <div style="height: 1000px"></div>

  </div>
</template>



<script>
import PromoRibbon from './components/public/PromoRibbon'
import Top from './components/public/Top'
import Navbar from './components/public/Navbar'
import Carousel from './components/public/Carousel'
import Presentation from './components/public/Presentation'


export default {
  name: 'App',
  components: {
    PromoRibbon,
    Top,
    Navbar,
    Carousel,
    Presentation,
  },
  data() {
    return {
      base: 'http://localhost:8000/',
      carousel: 'galleries/carousel/',
      presentation: 'presentation/',

    }
  }
}
</script>



<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  // Set your colors
  $primary: #00D1B2;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099ff;
  $twitter-invert: findColorInvert($twitter);
  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
      "white": ($white, $black),
      "black": ($black, $white),
      "light": ($light, $light-invert),
      "dark": ($dark, $dark-invert),
      "primary": ($primary, $primary-invert),
      "info": ($info, $info-invert),
      "success": ($success, $success-invert),
      "warning": ($warning, $warning-invert),
      "danger": ($danger, $danger-invert),
      "twitter": ($twitter, $twitter-invert)
  );
  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;
  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";








</style>
