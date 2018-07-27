<template>
  <div :class="{'highlighted': highlight}">
    <slot></slot>
  </div>

</template>

<script>
  export default {
    name: "Highlighted",
    props: {
      sub: {type: String},
      menu: {type: Array},
      name: {type: String},
    },
    data() {return {}},
    computed: {
      highlight() {
        return this.$Global.EditPannel.highlight(
          this.sub, this.menu, this.name)
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';


  .highlighted {
    transition: background-color .5s ease;
    background-color: $is-info;
  }

</style>
