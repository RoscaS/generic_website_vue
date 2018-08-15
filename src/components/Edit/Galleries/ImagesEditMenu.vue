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
            <h1>Edition: {{ store.title }}</h1>

            <div class="card secondary">
              <header class="card-header">
                <div class="card-header-title">
                  <GalleriesDropDown :store="store"/>
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
                          <h2>{{ store.title }}</h2>
                        </div>
                      </div>


                      <div class="field level-item auto-scroll"
                           v-if="store.related=='Carousel'">
                        <b-switch v-model="store.options.autoScroll"
                                  type="is-primary"
                                  size="is-small">
                          <small>Défilement automatique</small>
                        </b-switch>
                        <transition name="fade">
                          <b-field class="timer"
                                   v-if="store.options.autoScroll">
                            <b-input v-model="store.options.scrollTimer"
                                     type="number"
                                     min="5"
                                     max="60">
                            </b-input>
                          </b-field>
                        </transition>
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
                                :disabled="loading">
                      <FileUpload :edit="edit"
                                  :store="store"
                                  :gallery="store.string"/>
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
  import DescriptionPopup from './DescriptionPopup';

  export default {
    name: "ImagesEditMenu",
    components: {
      DragSort,
      GalleriesDropDown,
      FileUpload,
      SpinLine,
      DescriptionPopup,
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
        return this.layoutData[this.store.string];
      },
      layoutData() {
        return {
          events: {classes: this.columnsClasses},
          carousel: {classes: this.levelClasses},
          parallax: {classes: this.levelClasses},
        };
      },
    },
    created() {
      this.secondaryStore = this.edit.getStore('Stock');
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .auto-scroll {
    small {
      margin-right: 20px;
    }
    .timer {
      margin-top: -20px;
      width: 60px;
      height: 15px;
    }
  }

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
    .card-content {
      /*padding-left: 0px;*/
    }
  }

  .loading-animation {
    position: absolute;
    top: 80%;
    left: 49%;
    transform: scale(3.5);
  }

</style>
