<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link>-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~bulma/sass/utilities/initial-variables";
@import "~bulma/sass/utilities/functions";

// Set your colors
$primary: #00d1b2;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$green: #41b883;


@import "../static/sass/customBuefy";

// Import Bulma and Buefy styles

//$light: $twitter;


@import "~bulma";
@import "~buefy/src/scss/buefy";

</style>
