<template>
  <div>
    <div class="loading-animation">
      <SpinLine v-show="loading"/>
    </div>
    <div class="container">
      <div class="content">
        <ValidationBtns :edit="edit"
                        :top="layout.top"
                        right="0px"/>
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
                              type="is-info"
                              size="is-small">
                      <small>Défilement automatique</small>
                    </b-switch>
                    <transition name="fade">
                      <b-field class="timer" v-if="store.options.autoScroll">
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
    </div>
  </div>
</template>

<script>
  import {SpinLine} from 'vue-loading-spinner';
  import DragSort from '../../DragSort';
  import FileUpload from '../FileUpload';
  import ValidationBtns from '../ValidationButtons';
  import GalleriesEditStore from './GalleriesEditStore';
  import GalleriesDropDown from './GalleriesDropDown';

  export default {
    name: "ImagesEditMenu",
    components: {
      DragSort,
      GalleriesDropDown,
      ValidationBtns,
      FileUpload,
      SpinLine
    },
    props: {
      component: {type: String},
      classes: {type: Array},
      top: {type: String},
      right: {type: String, default: '88px'},
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
          events: {
            height: '500px', top: '790px', classes: this.columnsClasses
          },
          carousel: {
            height: '', top: '680px', classes: this.levelClasses
          },
          parallax: {
            height: '', top: '650px', classes: this.levelClasses
          },
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
    z-index: 20;
    position: absolute;
    top: 80%;
    left: 49%;
    transform: scale(3.5);
  }

</style>
