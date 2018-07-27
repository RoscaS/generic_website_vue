<template>

  <div>

    <div class="container">
      <div class="content">


        <div class="level">
          <div class="level-left">
            <button class="button is-info level-item"
                    @click="orderList">Reset
            </button>
            <b-checkbox class="level-item" type="is-info"
                        v-model="debug">Debug
            </b-checkbox>
            <b-checkbox class="level-item" type="is-info"
                        v-model="editable">Drag and drop
            </b-checkbox>
            <b-checkbox class="level-item" type="is-info"
                        v-model="hiddenGallery">Stock
            </b-checkbox>
          </div>
        </div>


        <draggable v-model="images"
                   :options="dragOptions"
                   :move="onMove"
                   @start="isDragging=true"
                   @end="isDragging=false">
          <transition-group type="transition"
                            class="columns is-multiline box main-section"
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
    </div>


    <!--<div class="content">-->
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


    <InOut type="fade" enter="Left" leave="Left">
      <GalleryDebug v-show="debug"></GalleryDebug>
    </InOut>

  </div>

</template>

<script>
  import axios from 'axios';
  import draggable from 'vuedraggable';
  import GalleryDebug from './GalleryDebug';
  import {Scrolly, ScrollyViewport, ScrollyBar} from 'vue-scrolly';


  export default {
    name: 'GalleryManager',
    components: {draggable, GalleryDebug, Scrolly, ScrollyViewport, ScrollyBar},
    data() {
      return {
        url: 'galleries/events/',
        related: null,
        dragged: null,

        images: [],
        hiddenImages: [],
        hiddenGallery: false,
        debug: false,
        reOrder: false,
        editable: true,
        isDragging: false,
        delayedDragging: false
      };
    },
    methods: {
      orderList() {
        this.reOrder = true;
        this.images = this.images.sort((one, two) => {return one.position - two.position; });
        setTimeout(() => { this.reOrder = false; }, 500);

      },
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
    computed: {
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

    },
    mounted() {
      axios.get(this.url).then(response => {
        response.data.images.forEach(image => {
          this.images.push({
            url: image.image,
            id: image.id,
            name: image.name,
            description: image.description,
            position: image.position,
            newPosition: -1,
            visible: image.visible,
            selected: false,
            fixed: false,
          });
        });
        this.images.sort((a, b) => a.position - b.position);
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .main-section {
    min-height: 380px;
  }

  .hidden-section {
    position: absolute;
    right: 2%;
    margin-top: -650px;
    height: 55%;
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
