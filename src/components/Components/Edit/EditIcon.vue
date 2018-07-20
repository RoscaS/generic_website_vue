<template>
  <div @mouseover="editIcon=true"
       @mouseleave="editIcon=false">
    <transition name="fade">
      <i class="fal fa-pencil-alt edit-icon"
         v-show="editIcon && !$Global.EditPannel.edit"
         @click="startEdit"
         :style="customStyle">
      </i>
    </transition>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "EditIcon",
    props: {
      Right: {type: String},
      Top: {type: String},
      Component: {type: String},
    },
    data() {
      return {
        // editIcon: false,
        editIcon: true,
      }
    },
    computed: {
      customStyle() {
        return `margin-top:${this.Top};right:${this.Right};`;
      }
    },
    methods: {
      startEdit() {
        this.$Global.EditPannel.startEdit(this.Component);
        this.$emit('backup-original-data');
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .edit-icon {
    font-size: 25px;
    transition: color .5s ease;
    position: absolute;
    color: $is-success;
    cursor: pointer;
    z-index: 1;

    &:hover {
      transition: color .5s ease;
      color: $link-hover !important;
    }

  }
</style>
