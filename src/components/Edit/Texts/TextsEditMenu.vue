<template>
  <transition name="slide"
              enter-active-class="slideInUp"
              leave-active-class="slideOutDown">

    <div class="navbar custom-tabs-wrapper textEdit" v-show="edit.active">

      <div class="columns">
        <div class="column
                    is-6-desktop
                    is-9-tablet
                    is-12-mobile
                    is-offset-2-desktop
                    is-offset-1-tablet">

          <div class="custom-tabs" :style="{height: height+'px'}">
            <slot></slot>
          </div>

        </div>
      </div>

      <ValidationBtns editMenu="text"/>
      <div class="loading-animation">
        <SpinLine v-show="edit.loading"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import {SpinLine} from 'vue-loading-spinner';
  import ValidationBtns from '../ValidationButtons';
  import TextsEditStore from './TextsEditStore'

  export default {
    name: "EditNav",
    components: {ValidationBtns, SpinLine},
    props: {
      height: {type: String}
    },
    data() {
      return {
        activeTab: 0,
        edit: TextsEditStore
      };
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .columns {
    margin-left: 14.5%;
    @media screen and (max-width: 768px) {
      margin-left: auto;
    }
  }

  .custom-tabs {
    height: 200px;
    /*width: 50%;*/
    margin: 0 auto 0 auto;

  }

  .loading-animation {
    position: absolute;
    top: -66%;
    left: 50%;
    transform: scale(3.5);
  }

  .custom-tabs-wrapper {
    color: white;
    width: 100%;
    display: block;
    position: fixed;
    bottom: 0;
    background-color: $top-title;
    -webkit-box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
    -moz-box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
    box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);

  }
</style>
