<template>
  <ModalLayout component="gallery" :classes="classes"/>
</template>

<script>
  import ModalLayout from './ModalLayout';

  export default {
    name: "GalleryEditModal",
    components: {ModalLayout},
    data() {
      return {
        classes: [
          '', '',
          'columns is-multiline center-content is-mobile',
          'column is-one-quarter'
        ]
      };
    },
    computed: {},
    methods: {},
  };
</script>

<style scoped lang="scss">
  @import '../../../../../static/sass/global';

</style>
