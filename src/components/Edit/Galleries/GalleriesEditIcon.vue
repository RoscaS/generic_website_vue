<template>
  <div>
    <button class="button is-danger"
            :style="setStyle"
            @click="startEdit()">
      <i class="fal fa-pencil-alt"></i>
    </button>

    <b-modal :active.sync="showModal"
             scroll="clip"
             :width="850"
             :canCancel="['outside']"
             has-modal-card>
      <CarouselModal v-if="is('Carousel')"/>
      <GalleryModal v-if="is('Gallery')"/>
      <ParallaxModal v-if="is('Parallax')" :id="id"/>
    </b-modal>

  </div>
</template>

<script>
  import GalleriesEditStore from './GalleriesEditStore'

  import CarouselModal from './Modals/CarouselEditModal'
  import GalleryModal from './Modals/GalleryEditModal'
  import ParallaxModal from './Modals/ParallaxEditModal'

  export default {
    name: "GalleryEditIcon",
    components: {
      CarouselModal,
      GalleryModal,
      ParallaxModal
    },
    props: {
      right: {type: String},
      top: {type: String},
      id: {type: Number},
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
      is(component) {
        return this.edit.component == component;
      },
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
