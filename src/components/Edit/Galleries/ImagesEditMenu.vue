<template>
  <section class="modal-wrapper">

    <div class="loading-animation">
      <SpinLine v-show="edit.loading"/>
    </div>

    <ImagesCard :edit="edit"/>

    <div class="content">
      <transition name="fade">
        <div v-if="!edit.editItem">
          <h1>Edition: {{ store.name }}</h1>

          <div class="card primary">
            <header class="card-header">
              <div class="card-header-title">
                <div class="level">
                  <div class="leve-left">
                    <div class="level-item">
                      <h2>{{ store.name}}</h2>
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
                      v-model="edit.activeTab"
                      position="is-right">
                <b-tab-item icon="images"
                            :disabled="edit.loading">
                  <DragSortImages :store="store"/>
                </b-tab-item>
                <b-tab-item icon="upload"
                            :title="'Poulette'"
                            :disabled="conditions">
                  <Upload @file="uploadImage"/>
                </b-tab-item>
              </b-tabs>
            </div>
          </div>

          <div class="card secondary">
            <header class="card-header">
              <div class="card-header-title">
                <div class="level">
                  <div class="level-item">
                    <GalleriesDropDown :store="store"/>
                  </div>
                  <div class="level-item top-counter">
                    <ImagesCounter :store="edit.secondaryStore"
                                   :verbose="true"/>
                  </div>
                </div>
              </div>
            </header>
            <div class="card-content">
              <DragSortImages :store="edit.secondaryStore"/>
            </div>
          </div>

        </div>
      </transition>
    </div>
  </section>
</template>

<script>
  import {SpinLine} from 'vue-loading-spinner';
  import DragSortImages from './DragSortImages';
  import Upload from "../Upload";
  import GalleriesStore from './GalleriesStore';
  import GalleriesDropDown from './GalleriesDropDown';
  import GalleryOptions from './GalleryOptions';
  import ImagesCard from './ImagesCard';
  import ImagesCounter from './ImagesCounter';

  export default {
    name: "ImagesEditMenu",
    components: {
      Upload,
      DragSortImages,
      GalleriesDropDown,
      SpinLine,
      GalleryOptions,
      ImagesCard,
      ImagesCounter,
    },
    props: {
      store: {type: Object},
    },
    data: () => ({}),
    computed: {
      edit() {return GalleriesStore;},
      conditions() {
        let storeConditions = this.store.isFull() && !this.store.isEmpty;
        return this.edit.loading || storeConditions;
      }
    },
    methods: {
      uploadImage(file) {
        let formData = new FormData();
        formData.append('image', file);
        formData.append('name', `${this.store.name}_${this.store.count()}`);
        formData.append('gallery', this.store.name);
        this.store.postImage(formData);
      },
    },
    created() {
      this.edit.primaryStore = this.store;
      this.edit.secondaryStore = this.edit.getStore('Stock');
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  section {
    min-width: 360px;
    width: 960px;

    @media screen and (max-width: 1000px) {
      width: 520px;
    }
    @media screen and (max-width: 520px) {
      width: 320px;
    }
  }

  h1 {
    position: relative;
    z-index: 1000;
    color: white;

  }

  .primary {
    max-height: 550px;
  }

  .secondary {
  }

  .card {
    z-index: 10;
    border-radius: 8px;
    margin-bottom: 60px;
    .card-header-title {
      h2 {
        margin-bottom: 0;
        margin-right: 20px;
        line-height: 40px;
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
