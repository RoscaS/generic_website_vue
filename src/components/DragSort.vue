<template>
  <div :class="classes[0]">
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
          <div :class="classes[3]"
               class="image-slot"
               v-for="image in store.images"
               :key="image.id">
            <div class="">
              <img :src="image.url">
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  // import {Scrolly, ScrollyViewport, ScrollyBar} from 'vue-scrolly';
  // import CarouselImagesStore from '../views/Carousel/CarouselImagesStore';
  // import GalleryImagesStore from '../views/Gallery/GalleryImagesStore';
  import GalleriesEditStore
    from '../components/Edit/Galleries/GalleriesEditStore';


  export default {
    name: "DragSort",
    components: {draggable},
    props: {
      component: {type: String},
      classes: {type: Array}
    },
    data() {
      return {
        related: null,
        dragged: null,

        isDragging: false,
        delayedDragging: false,

        reOrder: false,
      };
    },
    computed: {
      store() {
        return GalleriesEditStore.state[this.component.toLowerCase()].store.state;
      },
      dragOptions() {
        return {
          animation: 250,
          group: 'description',
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
          // this.setVisibility();
          // GalleriesEditStore.sendPushSignal();
          this.setPosition();
          this._debug();
          this.delayedDragging = false;
        });
      }
    },
    methods: {
      selectSecondary(secondary) { this.secondaryList = secondary; },
      onMove({relatedContext, draggedContext}) {
        console.log(relatedContext)
        // this.related = relatedContext;
        // this.dragged = draggedContext;
      },

      setPosition() {
        if (this.store.images.length) {
          for (let i = 0; i < this.store.images.length; i++) {
            this.store.images[i].position = i + 1;
          }
        }
        // this.store.store.putData();
        // GalleriesEditStore.sendUpdateSignal();
      },

      _debug() {
        // let root = this.$parent.$parent.$parent;
        // console.log('\n\nCURRENT:')
        // let a = '';
        // this.store.images.forEach(i => {a += `, ${i.id}`});
        // console.log(a);
        // console.log('PARENT:')
        // let b = '';
        // root.gallery.images.forEach(i => {b += `, ${i.id}`});
        // console.log(b);
        // console.log('CENTRAL:')
        // let f = '';
        // GalleriesEditStore.state.gallery.images.forEach(i => {f += `, ${i.id}`});
        // console.log(f);
        // console.log('ORIGINAL:')
        // let c = '';
        // GalleryImagesStore.state.images.forEach(i => {c += `, ${i.id}`;});
        // console.log(c);
        // let e = '';
        // console.log(`SECONDARY: ${root.secondaryList.name}`);
        // root.secondaryList.images.forEach(i => {
        //   e += `([${i.position}]id:${i.id}), `;
        // });
        // console.log(e);
        // let d = '';
        // console.log(`PRIMARY: ${root.gallery.name}`);
        // root.gallery.images.forEach(i => {
        //   d += `([${i.position}]id:${i.id}), `;
        // });
        // console.log(d);
        // console.log('\n\n');
      }
    },
    created() {
      // this.store = GalleriesEditStore.state[this.component.toLowerCase()].store.state;
    },
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

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
