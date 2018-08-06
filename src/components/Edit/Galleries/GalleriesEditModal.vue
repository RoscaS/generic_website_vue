<template>
  <modal name="GalleriesModal">

    <CarouselEditModal v-if="edit.component == 'Carousel'"></CarouselEditModal>
    <GalleryEditModal v-if="edit.component == 'Gallery'"></GalleryEditModal>
    <ParallaxEditModal v-if="edit.component == 'Parallax0'"></ParallaxEditModal>


  </modal>
</template>

<script>
  import GalleriesEditStore from './GalleriesEditStore';
  import CarouselEditModal from './modals/carouselEditModal'
  import GalleryEditModal from './modals/galleryEditModal'
  import ParallaxEditModal from './modals/parallaxEditModal'
  import Parallax from "../../Parallax";


  export default {
    name: "GalleriesEditModal",
    components: {Parallax, CarouselEditModal, GalleryEditModal, ParallaxEditModal},
    props: {
      component: {type: String,},
      showModal: {type: Boolean,},
    },
    data() {
      return {
        edit: GalleriesEditStore,
      };
    },

    methods: {
      hideModal () {
        this.$modal.hide('GalleriesModal');
      }
    },

    mounted() {
      console.log(this.edit.component);
      console.log('created')
      console.log(this.showModal)
      this.$modal.open('GalleriesModal');
    }

  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

</style>
