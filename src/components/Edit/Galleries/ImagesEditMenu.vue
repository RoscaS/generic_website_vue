<template>
  <div>
    <div class="loading-animation">
      <SpinLine v-show="loading"/>
    </div>
    <div class="container">
      <div class="content">
        <ValidationBtns editMenu="image"
                        :top="layout.top"
                        right="0px"/>
        <h1>Edition: {{ store.title }}</h1>

        <div class="card secondary">
          <header class="card-header">
            <div class="card-header-title">
              <b-dropdown mobile-modal>
                <button class="button is-info" slot="trigger">
                  <p>{{ secondaryStore.title }}</p>
                  <i class="fa fa-fw fa-sort-down"></i>
                </button>
                <b-dropdown-item v-for="i in dropDownList"
                                 :key="i.name"
                                 class="no-tr"
                                 @click="setSecondaryGallery(i)"
                                 :disabled="disabled(i)">
                  {{ i.title }}
                </b-dropdown-item>
              </b-dropdown>
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
              <h2 class="card-header-title">{{ store.title }}</h2>
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
                  <!--<FileUpload :edit="edit"-->
                  <!--:gallery="primaryGallery"/>-->
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
  import DragSort from '../../DragSort';
  import {SpinLine} from 'vue-loading-spinner';
  import FileUpload from '../FileUpload';
  import ValidationBtns from '../ValidationButtons';
  import GalleriesEditStore from './GalleriesEditStore';

  export default {
    name: "ImagesEditMenu",
    components: {DragSort, ValidationBtns, FileUpload, SpinLine},
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
        loading: GalleriesEditStore.edit,
        secondaryStore: GalleriesEditStore.state.stock,
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
      };
    },
    computed: {
      dropDownList() {
        let list = [];
        let galleries = this.edit.state;
        for (let i in galleries) {
          galleries[i] !== this.store ? list.push(galleries[i]) : null;
        }
        return list;
      },
      layoutData() {
        return {
          events: {height: '500px', top: '790px', classes: this.columnsClasses},
          carousel: {height: '', top: '680px', classes: this.levelClasses},
          parallax: {height: '', top: '650px', classes: this.levelClasses},
        };
      },
      layout() {
        return this.layoutData[this.store.related.toLowerCase()];
      },
      activeTab: {
        get() { return this.edit.activeTab; },
        set(value) { this.edit.setActiveTab(value);}
      }
    },
    methods: {
      setSecondaryGallery(secondary) {
        console.log(this['eventsData']);
        this.secondaryStore = secondary;
      },
      disabled(secondary) {
        return this.secondaryStore == secondary
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  h1 {
    z-index: 1000;
    color: white;
  }

  button {
    p {
      font-weight: bold;
      color: white;
    }
    i {
      margin-top: -22px;
      margin-left: 5px;
    }
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
      margin-bottom: 0;
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
