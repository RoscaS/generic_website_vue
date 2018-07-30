<template>
  <div>
    <button class="button is-danger"
            :style="setStyle"
            :disabled="edit.edit"
            @click="edit.startEdit(component)">
      <i class="fal fa-pencil-alt">
      </i>
    </button>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "EditIcon",
    props: {
      Right: {type: String},
      Top: {type: String},
      component: {type: String},
    },
    data() {
      return {
        edit: this.$Global.EditPannel,
      };
    },
    computed: {
      setStyle() { return `margin-top:${this.Top};`; },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .button {
    transition: .5s background-color ease;
    font-size: 20px;
    left: 50px;
    position: absolute;
    z-index: 1;

    &:hover {
      transition: .5s background-color ease;
      background-color: #d03656;
    }
  }
</style>

