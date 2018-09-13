<template>
  <h1 class="title header">
    <slot></slot>
    <div class="underline"></div>
  </h1>
</template>

<script>
export default {
  name: "Title"
};
</script>

<style scoped lang="scss">
@import "../scss/global";

.header {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
}

.underline {
  opacity: 0.65;
  margin: 15px auto 0 auto;
  width: 100px;
  border-bottom: 4px solid $underline;
}
</style>
