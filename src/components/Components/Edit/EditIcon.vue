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
      marginLeft: {type: String},
      marginTop: {type: String}
    },
    data() {
      return {
        editIcon: false,
      }
    },
    computed: {
      margins() {
        return `margin-top:${this.marginTop}`;
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
    right: 1px;

    &:hover {
      transition: color .5s ease;
      color: $link-hover;
    }

  }
</style>
