<template>
  <div @mouseover="editIcon=true"
       @mouseleave="editIcon=false">
    <transition name="fade">
      <i class="fal fa-pencil-alt edit-icon"
         v-show="editIcon && !$Global.EditPannel.edit"
         @click="startEdit"
         :style="margins">
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
        editIcon: false,
        // editIcon: true,
      }
    },
    computed: {
      margins() {
        return `top:${this.Top};right:${this.Right};`;
      }
    },
    methods: {
      startEdit() {
        console.log(this.Component)
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
    color: $link;
    cursor: pointer;

    &:hover {
      transition: color .5s ease;
      color: $link-hover;
    }

  }
</style>
