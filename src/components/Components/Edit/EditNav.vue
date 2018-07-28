<template>
  <transition name="slide"
              enter-active-class="slideInUp"
              leave-active-class="slideOutDown">

    <div class="navbar edit-area"
         v-show="editPannel.edit">
      <section class="section">
        <div class="columns is-8 is-variable ">

          <div class="column is-2 is-offset-3">
            <ul class="editLink">
              <li v-for="sub in $parent.menu">
                <a class="no-tr"
                   :class="{'selected': $parent.menu.find(i=>sub.name==i.name).display}"
                   @click="editPannel.editMenu(sub, $parent.menu)">
                  {{ sub.name }}
                </a>
              </li>
            </ul>
          </div>

          <slot></slot>

          <ValidationBtns></ValidationBtns>
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

  .edit-area {
    color: white;
    width: 100%;
    display: block;
    position: fixed;
    bottom: 0;
    min-height: 331px;
    background-color: $top-title;
    -webkit-box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
    -moz-box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
    box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
  }
</style>
