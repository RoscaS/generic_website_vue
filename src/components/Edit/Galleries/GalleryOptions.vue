<template>
<div class="wrapper">
  <div v-if="store.related=='Carousel'">
    <div class="level">
      <div class="level-item">
        <div class="field auto-scroll">
          <b-switch v-model="store.options.autoScroll"
                    type="is-info"
                    size="is-small">
          </b-switch>
        </div>
      </div>
      <div class="level-item">
        <small class="text">Défilement automatique</small>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: "GalleryOptions",
    props: {store: {type: Object}},
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .wrapper {
    margin-left: 20px;
    margin-bottom: -3px;
  }

  .timer {
    margin: 0 5px 0 5px;
    width: 120px;
  }

</style>
