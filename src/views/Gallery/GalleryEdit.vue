<template>

  <div>

    <!--<div class="container">-->
    <!--<div class="content">-->

                <!--@click="orderList">Reset-->

    <!--<div class="level">-->
      <!--<div class="level-left">-->
        <!--<button class="button is-info level-item"-->
                <!--@click="reOrder=true">Reset-->
        <!--</button>-->
        <!--<b-checkbox class="level-item" type="is-info"-->
                    <!--v-model="editable">Drag and drop-->
        <!--</b-checkbox>-->
        <!--<b-checkbox class="level-item" type="is-info"-->
                    <!--v-model="hiddenGallery">Stock-->
        <!--</b-checkbox>-->
      <!--</div>-->
    <!--</div>-->


    <div class="columns">
      <div class="column is-6 is-offset-3-desktop">


        <draggable v-model="images"
                   :options="dragOptions"
                   :move="onMove"
                   @start="isDragging=true"
                   @end="isDragging=false">
          <transition-group type="transition"
                            class="columns is-multiline main-section"
                            tag="div"
                            :name="reOrder? 'flip-list': ''">
            <div class="column is-one-quarter"
                 v-for="image in images"
                 :key="image.position">
              <div class="">
                <img :src="image.url" alt="">
              </div>

            </div>
          </transition-group>
        </draggable>
      </div>

      <!--</div>-->

      <div class="column is-1"></div>

      <div class="column is-2">

        <InOut type="fade" enter="Right" leave="Right">
          <div class="card hidden-section" v-show="hiddenGallery">
            <header class="card-header">
              <p class="card-header-title">Stock</p>
            </header>

            <div class="card-content">
              <scrolly class="body"
                       :parentScroll="false"
                       :style="{ width: '', height: '104%'}">
                <scrolly-viewport>

                  <draggable v-model="hiddenImages"
                             :options="dragOptions"
                             :move="onMove"
                             @start="isDragging=true"
                             @end="isDragging=false">
                    <transition-group type="transition"
                                      class="place-holder"
                                      tag="div">
                      <!--:name="'flip-list'">-->

                      <div class="place-holder"
                           v-for="image in hiddenImages"
                           :key="image.position">
                        <img style="max-height: 117px" :src="image.url" alt="">
                      </div>


                    </transition-group>
                  </draggable>
                </scrolly-viewport>
                <scrolly-bar axis="y"></scrolly-bar>
              </scrolly>
            </div>


            <div class="is-empty content" v-if="hiddenImages == 0">
              <h3>Vide</h3>
              <h5>Glissez une image ici.</h5>
            </div>
          </div>
        </InOut>

      </div>
    </div>
  </div>

</template>

<script>
  import draggable from 'vuedraggable';
  import {Scrolly, ScrollyViewport, ScrollyBar} from 'vue-scrolly';
  import GalleriesEditStore from '../../components/Edit/Galleries/GalleriesEditStore';

  export default {
    name: 'GalleryManager',
    components: {draggable, Scrolly, ScrollyViewport, ScrollyBar},
    data() {
      return {
        store: GalleriesEditStore,
        state: GalleriesEditStore.galeries.gallery.state,

        related: null,
        dragged: null,

        hiddenImages: [],
        hiddenGallery: true,
        editable: true,
        isDragging: false,
        delayedDragging: false,

        reOrder: false,
      };
    },
    computed: {
      images() { return this.state.images },

      dragOptions() {
        return {
          animation: 250,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'none'
          // ghostClass: 'ghost'
        };
      },
      getList() {
        return this.images;
      },
      getListHidden() {
        return this.hiddenImages;
      },
    },
    methods: {
      onMove({relatedContext, draggedContext}) {
        // this.related = relatedContext;
        // this.dragged = draggedContext;
      },

      // setVisibility() {
      //   let image = this.related.list[this.dragged.index];
      //   if (!this.images.find(i => i == image)) {
      //     this.dragged.element.visible = false;
      //   }
      //   else {
      //     this.dragged.element.visible = true;
      //   }
      // },

      // setNewPos() {
      // for (let tab of [this.images, this.hiddenImages]) {
      //   if (tab) {
      //     for (let i = 0; i < tab.length; i++) {
      //       tab[i].newPosition = i + 1;
      //     }
      //   }
      // }
      // },
    },

    watch: {
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true;
          return;
        }
        this.$nextTick(() => {
          // this.setVisibility();
          this.delayedDragging = false;
        });
      },
      reOrder() {
        this.images = this.images.sort((one, two) => {
          return one.position - two.position;
        });
        setTimeout(() => { this.reOrder = false; }, 500);
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .hidden-section {
     margin-top: -175px;
    height: 490px;
    width: 250px;
    z-index: 1;

    .card-content {
      height: 88%;
    }

    .place-holder {
      height: 117px;
      width: 209px;
      margin-bottom: 15px;

    }

    .is-empty {
      text-align: center;
      position: absolute;
      top: 20%;
      left: 13%;
    }
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
