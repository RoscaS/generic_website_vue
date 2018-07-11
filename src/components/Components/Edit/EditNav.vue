<template>
  <transition name="slide"
              enter-active-class="slideInUp"
              leave-active-class="slideOutDown">
    <div class="navbar edit-area"
         v-show="editNav">
      <section class="section edit-slots">
        <div class="columns content">
          <slot></slot>
          <Buttons @close-edit="editOff"></Buttons>
        </div>
      </section>
    </div>
  </transition>
</template>

<script>
  import store from './EditStore';
  import Buttons from './ValidationButtons'
  import {mapGetters, mapActions} from 'vuex';


  export default {
    name: "EditNav",
    components: {Buttons},
    store: store,
    computed: {
      ...mapGetters([
        'editNav'
      ]),
    },
    methods: {
      ...mapActions([
        'editOff'
      ])
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

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
