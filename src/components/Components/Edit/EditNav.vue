<template>
  <transition name="slide"
              enter-active-class="slideInUp"
              leave-active-class="slideOutDown">
    <nav class="navbar is-fixed-bottom edit-area"
         v-show="editNav"
         :style="halfHeight">
      <slot></slot>
    </nav>
  </transition>
</template>

<script>
  import store from './EditStore';
  import {mapGetters} from 'vuex';


  export default {
    name: "EditNav",
    store: store,
    computed: {
      ...mapGetters([
        'editNav'
      ]),
      halfHeight() {return `height: ${window.innerHeight / 3}px`;}

    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .edit-area {
    //height: 200px;
    background-color: $top-title;
    -webkit-box-shadow: -1px -3px 24px -2px rgba(0,0,0,0.59);
    -moz-box-shadow: -1px -3px 24px -2px rgba(0,0,0,0.59);
    box-shadow: -1px -3px 24px -2px rgba(0,0,0,0.59);
  }
</style>
