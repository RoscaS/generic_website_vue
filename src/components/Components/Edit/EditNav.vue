<template>
    <transition name="slide"
                enter-active-class="slideInUp"
                leave-active-class="slideOutDown">
      <div class="navbar edit-area"
           v-show="editNav">
        <section class="section">
          <div class="columns is-8 is-variable ">

            <slot></slot>

            <ValidationBtns @close-edit="closeEdit"
                            @is-loading="loading=true">
            </ValidationBtns>
          </div>
        </section>
        <div class="loading-animation">
          <SpinLine v-show="loading"/>
        </div>
      </div>
    </transition>
</template>

<script>
  import {SpinLine} from 'vue-loading-spinner';
  import ValidationBtns from './ValidationButtons';

  export default {
    name: "EditNav",
    components: {ValidationBtns, SpinLine},
    data() {
      return {
        loading: false,
      };
    },
    computed: {
      editNav() { return this.$Global.EditPannel.edit; }
    },
    methods: {
      closeEdit() {
        this.$Global.EditPannel.endEdit();
        this.loading = false;
      }
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

  .edit-area {
    /*overflow: auto;*/
    color: white;
    width: 100%;
    display: block;
    position: fixed;
    bottom: 0;
    /*height: 311px;*/
    background-color: $top-title;
    -webkit-box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
    -moz-box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
    box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
  }
</style>
