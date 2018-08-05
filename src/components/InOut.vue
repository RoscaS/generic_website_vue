<template>
  <transition name="custom-transition"
              :enter-active-class="type+'In'+enter"
              :leave-active-class="type+'Out'+leave">
    <slot></slot>
  </transition>

</template>

<script>
  export default {
    name: "InOut",
    props: {
      type: {type: String, default: 'fade'},
      enter: {type: String, default: ''},
      leave: {type: String, default: ''},
    }
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

</style>
