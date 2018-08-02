<template>
  <transition name="slide"
              enter-active-class="slideInUp"
              leave-active-class="slideOutDown">

    <div class="navbar custom-tabs-wrapper" v-show="edit.active">

      <div class="columns">
        <div class="column is-5-desktop is-offset-3-desktop">

          <div class="custom-tabs" :style="{height: height+'px'}">
            <slot></slot>
          </div>

        </div>
      </div>

      <ValidationBtns></ValidationBtns>
      <div class="loading-animation">
        <SpinLine v-show="edit.loading"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import {SpinLine} from 'vue-loading-spinner';
  import FileUpload from '../../Components/Edit/FileUpload';
  import ValidationBtns from './ValidationButtons';
  import EditStore from '../../../components/Components/Edit/EditStore'

  export default {
    name: "EditNav",
    components: {ValidationBtns, FileUpload, SpinLine},
    props: {
      height: {type: String}
    },
    data() {
      return {
        activeTab: 0,
        edit: EditStore
      };
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .columns {
    margin-left: 7%;
    @media screen and (max-width: 1089px) {
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
