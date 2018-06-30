<template>
  <div class="container">
    <div class="content">
      <section class="section">
        <h1 class="title header">{{ title }}</h1>
        <p class="sub-title">{{ subTitle }}</p>
        <div class="main">
          <slot name="content"></slot>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SectionContainer",
    props: {
      title: {type: String},
      subTitle: {type: String},
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .header {
    font-weight: normal !important;
    text-align: center;
    width: 400px;
    margin: 0 auto 0 auto;
    padding-bottom: 10px;
    border-bottom: 1px solid $accent;
  }

  .sub-title {
    margin: 15px auto 15px auto;
    font-size: 14px;
    text-align: center;
    font-style: italic;
  }

  .main {
    margin-top: 50px !important;
  }
</style>
