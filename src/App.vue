<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
  export default {};
</script>


<style lang="scss">

  /*@import "~bulma/sass/utilities/_all";*/
  @import "~bulma/sass/utilities/initial-variables";
  @import "~bulma/sass/utilities/functions";

  // Set your colors
  $primary: #00D1B2;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099ff;
  $twitter-invert: findColorInvert($twitter);

  $green: #41B883;




  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";

</style>
