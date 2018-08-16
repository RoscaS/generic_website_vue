<template>
  <div>

    <div class="loading-animation">
      <SpinLine v-show="loading"/>
    </div>

    <DescriptionPopup :edit="edit"/>

    <div class="container">
      <div class="content">
        <transition name="fade">
          <div v-if="!edit.selectedImage">
            <h1>Edition: {{ store.related }}</h1>

            <div class="card secondary">
              <header class="card-header">
                <div class="card-header-title">
                  <div class="level">
                    <div class="level-item">
                      <GalleriesDropDown :store="store"/>
                    </div>
                    <div class="level-item top-counter">
                      <ImagesCounter :store="secondaryStore" :verbose="true"/>
                    </div>
                  </div>
                </div>

              </header>
              <div class="card-content">
                <DragSort :store="secondaryStore"
                          :classes="levelClasses"/>
              </div>
            </div>

            <div class="primary">
              <div class="card">
                <header class="card-header">
                  <div class="card-header-title">
                    <div class="level">
                      <div class="leve-left">
                        <div class="level-item">
                          <h2>{{ store.related}}</h2>
                        </div>
                      </div>

                      <div class="level-item">
                        <ImagesCounter :store="store" :verbose="true"/>
                      </div>

                      <div class="level-item">
                        <GalleryOptions :store="store"/>
                      </div>

                    </div>
                  </div>
                </header>
                <div class="card-content imagesEdit">
                  <b-tabs type="is-toggle"
                          v-model="activeTab"
                          position="is-right">
                    <b-tab-item icon="images"
                                :disabled="loading">
                      <DragSort :store="store"
                                :classes="layout.classes"/>
                    </b-tab-item>
                    <b-tab-item icon="upload"
                                :title="'Poulette'"
                                :disabled="loading || store.isFull()">
                      <FileUpload :edit="edit"
                                  :store="store"
                                  :gallery="store.related"/>
                    </b-tab-item>
                  </b-tabs>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {SpinLine} from 'vue-loading-spinner';
  import DragSort from './DragSortImages';
  import FileUpload from '../FileUpload';
  import GalleriesEditStore from './GalleriesEditStore';
  import GalleriesDropDown from './GalleriesDropDown';
  import GalleryOptions from './GalleryOptions';
  import DescriptionPopup from './DescriptionPopup';
  import ImagesCounter from './ImagesCounter';

  export default {
    name: "ImagesEditMenu",
    components: {
      DragSort,
      GalleriesDropDown,
      FileUpload,
      SpinLine,
      GalleryOptions,
      DescriptionPopup,
      ImagesCounter,
    },
    props: {
      store: {type: Object},
    },
    data() {
      return {
        edit: GalleriesEditStore,
        levelClasses: [
          'level is-mobile',
          'level-left',
          'level-item',
          'level-item'
        ],
        columnsClasses: [
          '', '',
          'columns is-multiline is-mobile',
          'column is-one-quarter'
        ],

        autoScroll: false,

      };
    },
    computed: {
      primaryStore: {
        get() { return this.edit.primaryStore; },
        set(store) { this.edit.primaryStore = store;},
      },
      secondaryStore: {
        get() { return this.edit.secondaryStore; },
        set(store) { this.edit.secondaryStore = store;},
      },
      activeTab: {
        get() { return this.edit.activeTab; },
        set(value) { this.edit.activeTab = value; }
      },
      loading() {
        return this.edit.loading;
      },
      layout() {
        return this.layoutData[this.store.related];
      },
      layoutData() {
        return {
          Events: {classes: this.columnsClasses},
          Carousel: {classes: this.levelClasses},
          Parallax: {classes: this.levelClasses},
        };
      },
    },
    created() {
      this.primaryStore = this.store;
      this.secondaryStore = this.edit.getStore('Stock');
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  h1 {
    z-index: 1000;
    color: white;
  }

  .container {
    margin-top: 140px;
    width: 850px;
  }

  .primary {
    height: 450px;
  }

  .secondary {
    height: 245px;
  }

  .card {
    margin-bottom: 60px;
    max-width: 850px;

    .card-header-title {
      h2 {
        margin-bottom: 0;
        margin-right: 20px;
      }
    }
  }

  .loading-animation {
    position: absolute;
    top: 80%;
    left: 49%;
    transform: scale(3.5);
  }

  .top-counter {
    margin-left: 20px;
  }

</style>
