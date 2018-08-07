<template>
  <div :class="classes[0]">
    <div :class="classes[1]">
      <draggable v-model="list.images"
                 :options="dragOptions"
                 :move="onMove"
                 @start="isDragging=true"
                 @end="isDragging=false">
        <transition-group type="transition"
                          :class="classes[2]"
                          tag="div"
                          :name="reOrder? 'flip-list': ''">
          <div :class="classes[3]"
               class="image-slot"
               v-for="image in list.images"
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
  import {Scrolly, ScrollyViewport, ScrollyBar} from 'vue-scrolly';

  import CarouselImagesStore from '../views/Carousel/CarouselImagesStore';
  import GalleriesEditStore from '../components/Edit/Galleries/GalleriesEditStore';


  export default {
    name: "DragSort",
    components: {draggable},
    props: {
      list: {type: Object},
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
          this._debug();
          this.delayedDragging = false;
        });
      }
    },
    methods: {
      selectSecondary(secondary) { this.secondaryList = secondary; },
      onMove({relatedContext, draggedContext}) {
        // this.related = relatedContext;
        // this.dragged = draggedContext;
      },

      _debug() {
        // console.log('\nCURRENT:')
        // let a = '';
        // this.list.images.forEach(i => {a += `, ${i.id}`});
        // console.log(a);
        // console.log('\nPARENT:')
        // let b = '';
        // this.$parent.primaryList['carousel'].images.forEach(i => {b += `, ${i.id}`});
        // console.log(b);
        // console.log('\nORIGINAL:')
        // let c = '';
        // CarouselImagesStore.state.images.forEach(i => {c += `, ${i.id}`});
        // console.log(c);
        let e = '';
        console.log(`SECONDARY: ${this.$parent.secondaryList.name}`)
        this.$parent.secondaryList.images.forEach(i => {
          e += `[id:${i.id}, pos:${i.position}]`
        });
        console.log(e);
        let d = '';
        console.log(`PRIMARY: ${this.$parent.gallery.name}`)
        this.$parent.gallery.images.forEach(i => {d += `, ${i.id}`});
        console.log(d);
        console.log('\n\n')



      }
    },
    mounted() {
      this._debug();
    }
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
