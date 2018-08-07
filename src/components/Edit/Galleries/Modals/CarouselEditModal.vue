<template>
  <ModalLayout component="carousel" :classes="classes"/>
</template>

<script>
  import ModalLayout from './ModalLayout';

  export default {
    name: "CarouselEditModal",
    components: {ModalLayout},
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



