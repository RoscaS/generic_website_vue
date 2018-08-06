<template>
  <div>
    <button class="button is-danger"
            :style="setStyle"
            @click="startEdit()">
      <i class="fal fa-pencil-alt"></i>
    </button>

    <b-modal :active.sync="showModal"
             :width="1024" scroll="keep" has-modal-card>
      <CarouselEditModal v-if="edit.component == 'Carousel'"></CarouselEditModal>
      <GalleryEditModal v-if="edit.component == 'Gallery'"></GalleryEditModal>
      <ParallaxEditModal v-if="edit.component == 'Parallax0'"></ParallaxEditModal>
    </b-modal>

  </div>
</template>

<script>
  import GalleriesEditStore from './GalleriesEditStore'

  import CarouselEditModal from './modals/carouselEditModal'
  import GalleryEditModal from './modals/galleryEditModal'
  import ParallaxEditModal from './modals/parallaxEditModal'

  export default {
    name: "GalleryEditIcon",
    components: {
      CarouselEditModal,
      GalleryEditModal,
      ParallaxEditModal
    },
    props: {
      right: {type: String},
      top: {type: String},
      component: {type: String},
    },
    data() {
      return {
        edit: GalleriesEditStore,
        showModal: false,
      }
    },
    computed: {
      setStyle() { return `margin-top:${this.Top};`; },
    },
    methods: {
      startEdit() {
        this.edit.start(this.component);
        this.showModal = true;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .button {
    transition: .5s background-color ease;
    font-size: 20px;
    left: 50px;
    margin-top: 50px;
    position: absolute;
    z-index: 1;

    &:hover {
      transition: .5s background-color ease;
      background-color: #d03656;
    }
  }

</style>
