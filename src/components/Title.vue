<template>
  <h1 class="title header">
    <slot></slot>
    <div class="underline"></div>
  </h1>

</template>

<script>
  export default {
    name: "Title",
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

  .header {
    text-align: center;
    width: 400px;
    margin: 0 auto 0 auto;
    padding-bottom: 10px;
  }

  .underline {
    opacity: .65;
    margin: 15px auto 0 auto;
    width: 100px;
    border-bottom: 4px solid $is-danger;
  }

</style>
