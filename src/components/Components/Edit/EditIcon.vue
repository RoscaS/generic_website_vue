<template>
  <div @mouseover="editIcon=true"
       @mouseleave="editIcon=false">
    <transition name="fade">
      <i class="fal fa-pencil-alt edit-icon fa-2x"
         v-show="editIcon"
         @click="startEdit"
         :style="margins">
      </i>
    </transition>
    <slot></slot>
  </div>
</template>

<script>
  import store from './EditStore';
  import {mapActions} from 'vuex';

  export default {
    name: "EditIcon",
    store: store,
    props: {
      Right: {type: String},
      Top: {type: String}
    },
    data() {
      return {
        editIcon: false,
      }
    },
    computed: {
      margins() {
        return `top:${this.Top};right:${this.Right};`;
      }
    },
    methods: {
      ...mapActions([
        'editOn',
      ]),

      startEdit() {
        this.editOn();
        this.$emit('backup-original-data');
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .edit-icon {
    transition: color .5s ease;
    position: absolute;
    color: $link;
    cursor: pointer;

    &:hover {
      transition: color .5s ease;
      color: $link-hover;
    }

  }
</style>
