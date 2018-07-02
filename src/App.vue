<template>
  <div id="app">
    <PromoRibbon/>
    <Top/>
    <Navbar/>
    <Carousel :url="base + carousel"/>
    <Presentation :url="base + presentation"/>
    <Hero :url="base + hero"/>
    <Parallax :url="base + parallax" :idx="0" :height="600"/>
    <Presentation :url="base + presentation"/>
    <Parallax :url="base + parallax" :idx="1" :height="400"/>
    <Gallery :url="base + gallery" :urlData="base + galleryData"/>
    <Parallax :url="base + parallax" :idx="2" :height="400"/>
    <div style="height: 1000px"></div>

  </div>
</template>


<script>
  import Parallax from './components/Components/Parallax';
  import PromoRibbon from './components/public/PromoRibbon';
  import Top from './components/public/Top';
  import Navbar from './components/public/Navbar';
  import Carousel from './components/public/Carousel';
  import Presentation from './components/public/Presentation';
  import Hero from './components/public/Hero';
  import Gallery from './components/public/Gallery';


  export default {
    name: 'App',
    components: {
      Parallax,
      PromoRibbon,
      Top,
      Navbar,
      Carousel,
      Presentation,
      Hero,
      Gallery,

    },
    data() {
      return {
        base: 'http://localhost:8000/',
        parallax: 'galleries/parallax/',

        carousel: 'galleries/carousel/',
        presentation: 'presentation/',
        hero: 'hero/',
        gallery: 'galleries/events/',
        galleryData: 'gallery/',
      };
    },
  };
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
