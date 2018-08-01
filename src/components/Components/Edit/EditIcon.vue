<template>
  <div>
    <button class="button is-danger"
            :style="setStyle"
            :disabled="edit.active"
            @click="edit.start(component)">
      <i class="fal fa-pencil-alt">
      </i>
    </button>
    <slot></slot>
  </div>
</template>

<script>
  import EditStore from '../../../components/Components/Edit/EditStore'

  export default {
    name: "EditIcon",
    props: {
      right: {type: String},
      top: {type: String},
      component: {type: String},
    },
    data() {
      return {
        edit: EditStore
      }
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

