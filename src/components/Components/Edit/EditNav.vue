<template>
  <div>
    <transition name="slide"
                enter-active-class="slideInUp"
                leave-active-class="slideOutDown">
      <div class="navbar edit-area"
           v-show="editNav">
        <section class="section edit-slots">
          <div class="columns is-8 is-variable ">
            <slot></slot>
            <ValidationBtns @close-edit="closeEdit"
                            @is-loading="loading=true">
            </ValidationBtns>
          </div>
        </section>
        <div class="loading-icon">
          <SpinLine v-show="loading"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {SpinLine} from 'vue-loading-spinner'

  import store from './EditStore';
  import ValidationBtns from './ValidationButtons';
  import {mapGetters, mapActions} from 'vuex';


  export default {
    name: "EditNav",
    components: {ValidationBtns, SpinLine},
    store: store,
    data() {
      return {
        loading: false,
      };
    },
    computed: {
      ...mapGetters([
        'editNav'
      ]),
    },
    methods: {
      ...mapActions([
        'editOff'
      ]),

      closeEdit() {
        this.editOff();
        this.loading = false;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .loading-icon {
    position: absolute;
    top: -66%;
    left: 50%;
    transform: scale(3.5);
  }

  .edit-area {
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
