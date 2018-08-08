<template>
  <ImagesEditMenu component="carousel" :classes="classes" top="680px"/>
</template>

<script>
  import ImagesEditMenu from '../ImagesEditMenu';

  export default {
    name: "CarouselEditModal",
    components: {ImagesEditMenu},
    data() {
      return {
        classes: [
          'level is-mobile', 'level-left',
          'level-item', 'level-item',
        ]
      };
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../../static/sass/global';

</style>



