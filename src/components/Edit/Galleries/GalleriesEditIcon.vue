<template>
  <div>
    <button class="button is-danger"
            :style="setStyle"
            @click="startEdit()">
      <i class="fal fa-pencil-alt"></i>
    </button>
    <GalleriesEditModal :component="component"
                        :showModal="showModal"
                        v-if="showModal">
    </GalleriesEditModal>
  </div>
</template>

<script>
  import GalleriesEditStore from './GalleriesEditStore'
  import GalleriesEditModal from './GalleriesEditModal'

  export default {
    name: "GalleryEditIcon",
    components: {GalleriesEditModal},
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
