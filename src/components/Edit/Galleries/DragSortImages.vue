<template>
  <div :class="classes[0]">
    <div :class="classes[1]">
      <draggable v-model="store.state.images"
                 :options="dragOptions"
                 :move="onMove"
                 @start="isDragging=true"
                 @end="isDragging=false">
        <transition-group type="transition"
                          :class="classes[2]"
                          tag="div"
                          :name="reOrder? 'flip-store': ''">
          <div v-for="image in store.state.images"
               :class="classes[3]"
               class="image-slot"
               :key="image.id">
            <ImageOverlay :isDragging="isDragging">
              <img :src="image.url">
            </ImageOverlay>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>

</template>

<script>
  import draggable from 'vuedraggable';
  import GalleriesEditStore from './GalleriesEditStore';
  import ImageOverlay from './ImageOverlay';


  export default {
    name: "DragSortImages",
    components: {draggable, ImageOverlay},
    props: {
      component: {type: String},
      classes: {type: Array},
      store: {type: Object},
    },
    data() {
      return {
        edit: GalleriesEditStore,

        isDragging: false,
        delayedDragging: false,
        reOrder: false,
      };
    },
    computed: {
      dragOptions() {
        return {animation: 250, group: 'description', ghostClass: 'none'};
      },
    },
    watch: {
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true;
          return;
        }
        this.$nextTick(() => {
        });
      }
    },
    methods: {
      onMove({relatedContext, draggedContext}) {
        // console.log(this.isDragging)
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .level {
    overflow: auto;
  }

  .center-content {
    margin: 0 auto 0 auto;
  }

  .image-slot {
    width: 200px;
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

</style>
