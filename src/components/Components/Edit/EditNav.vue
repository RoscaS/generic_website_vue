<template>
  <transition name="slide"
              enter-active-class="slideInUp"
              leave-active-class="slideOutDown">
    <div class="navbar edit-area"
         v-show="editNav">
      <section class="section edit-slots">
        <div class="columns content">
          <slot></slot>
          <Buttons @close-edit="closeEdit" @is-loading="loading=true"></Buttons>
        </div>
      </section>
      <b-loading :is-full-page="false" :active.sync="loading" :can-cancel="false"></b-loading>
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
    data() {
      return {
        loading: false,
      }
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
