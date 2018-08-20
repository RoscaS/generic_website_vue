<template>
  <div :class="classes[0]" class="wrapper">
    <div :class="classes[1]">
      <draggable v-model="store.images"
                 :options="dragOptions"
                 :move="onMove"
                 @start="isDragging=true"
                 @end="isDragging=false">

        <transition-group type="transition"
                          :class="classes[2]"
                          tag="div"
                          :name="reOrder? 'flip-store': ''">

          <div v-for="image in store.images"
               :class="[{placeHolder: isPlaceholder(image)}, classes[3]]"
               class="image-slot"
               :key="image.id">

            <ImageOverlay :image="image" :edit="edit">
              <img :src="image.image"
                   @mousedown="conditions(image.gallery)">
            </ImageOverlay>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
  import {Scrolly, ScrollyViewport, ScrollyBar} from 'vue-scrolly';
  import draggable from 'vuedraggable';
  import GalleriesStore from './GalleriesStore';
  import ImageOverlay from './ImageOverlay';


  export default {
    name: "DragSortImages",
    components: {draggable, ImageOverlay, Scrolly, ScrollyViewport, ScrollyBar},
    props: {
      classes: {type: Array},
      store: {type: Object},
    },
    data() {
      return {
        edit: GalleriesStore,
        isDragging: false,
        delayedDragging: false,
        reOrder: false,
      };
    },
    computed: {
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
        if (!otherGallery.isEmpty && otherGallery.count >= otherGallery.limit) {
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

  .wrapper {
    margin-right: 10px;
  }

  .level {
    overflow: auto;
  }

  .center-content {
    margin: 0 auto 0 auto;
  }

  .columns {
    width: 104%;
  }

  .column {
    padding-bottom: 0px;
    padding-left: 0px;
  }

  .level-item {
    min-height: 106px;
    min-width: 210px;
  }

  .image-slot {
    cursor: grab;
    width: 210px;
    min-height: 50px;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }

  .placeHolder {
    cursor: default;
  }

</style>
