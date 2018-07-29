<template>
  <transition name="slide"
              enter-active-class="slideInUp"
              leave-active-class="slideOutDown">

    <div class="navbar custom-tabs-wrapper" v-show="editPannel.edit">

              <slot></slot>

        <ValidationBtns></ValidationBtns>
      <div class="loading-animation">
        <SpinLine v-show="loading"/>
      </div>
    </div>
  </transition>
</template>

<script>
  import {SpinLine} from 'vue-loading-spinner';
  import FileUpload from '../../Components/Edit/FileUpload';
  import ValidationBtns from './ValidationButtons';


  export default {
    name: "EditNav",
    components: {ValidationBtns, FileUpload, SpinLine},
    data() {
      return {
        activeTab: 0,
        menu: this.$parent.menu,
        editPannel: this.$Global.EditPannel
      };
    },

    computed: {
      loading: {
        get() { return this.editPannel.loading; },
        set(value) { this.editPannel.loading = value;}
      },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

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
