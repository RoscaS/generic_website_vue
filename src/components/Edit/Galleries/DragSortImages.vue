<template>
  <draggable v-model="store.images"
             :options="dragOptions"
             :move="onMove"
             @start="isDragging=true"
             @end="isDragging=false">

    <transition-group type="transition"
                      class="columns is-mobile"
                      tag="div"
                      :class="{'is-multiline cols-margins': primaryIsEvents}"
                      :name="reOrder? 'flip-store': ''">

      <div v-for="image in store.images"
           class="column is-one-quarter"
           :class="[{placeHolder: isPlaceholder(image)}]"
           @mousedown="conditions(image.gallery)"
           :key="image.id">
        <ImageOverlay :image="image"/>
      </div>
    </transition-group>
  </draggable>
</template>

<script>
  import draggable from 'vuedraggable';
  import GalleriesStore from './GalleriesStore';
  import ImageOverlay from './ImageOverlay';

  export default {
    name: "DragSortImages",
    components: {draggable, ImageOverlay},
    props: {
      store: {type: Object},
    },
    data: () => ({
      isDragging: false,
      delayedDragging: false,
      reOrder: false,
    }),
    computed: {
      edit() {return GalleriesStore},
      editable() {
        return !this.store.isLocked;
      },
      dragOptions() {
        return {
          animation: 250,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'none'
        };
      },
      primaryIsEvents() {
        let a = this.edit.primaryStore.name == 'Events';
        let b = this.store.name == 'Events';
        return a && b
      },
    },
    watch: {
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true;
          return;
        }
        this.$nextTick(() => {
          this.edit.update();
          this.unlockGalleries();
        });
      }
    },
    methods: {

      isPlaceholder(image) {return image.name.includes('placeholder');},

      onMove({relatedContext, draggedContext}) {},

      conditions(galleryName) {
        let galleries = [this.edit.primaryStore, this.edit.secondaryStore];
        let clickedGallery = this.edit.getStore(galleryName);
        let otherGallery = galleries.filter(i => i != clickedGallery)[0];
        let gallery = this.edit.getStore(galleryName);
        this.checkEmpty(gallery, otherGallery);
        this.checkFull(otherGallery);
      },

      checkEmpty(gallery, otherGallery) {
        if (gallery.placeholder) otherGallery.lock();
      },

      checkFull(otherGallery) {
        if (!otherGallery.isEmpty && otherGallery.count() >= otherGallery.limit) {
          otherGallery.lock();
        }

      },
      unlockGalleries() {
        this.edit.primaryStore.unlock();
        this.edit.secondaryStore.unlock();
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .cols-margins {
    margin: 0 5% 0 5%;
  }

  .columns {
    overflow-x: auto;
    overflow-y: auto;
    max-height: 550px;
  }

  .column {
    cursor: grab;
    margin: 2px 2px 2px 2px;
    padding: 0!important;
    width: $edit-width !important;
    height: $edit-height !important;
  }

</style>
