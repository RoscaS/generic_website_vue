<template>
  <div>
    <div class="loading-animation">
      <SpinLine v-show="edit.loading"/>
    </div>
    <div class="container">
      <div class="content">
        <ValidationBtns :edit="edit" :top="top" :right="right"/>

        <h1>Edition: {{ gallery.name }}</h1>

        <div class="card secondary">
          <header class="card-header">
            <div class="card-header-title">
              <b-dropdown mobile-modal>
                <button class="button is-info" slot="trigger">
                  <p>{{ secondaryList.name }}</p>
                  <i class="fa fa-fw fa-sort-down"></i>
                </button>
                <b-dropdown-item v-for="i in primaryList"
                                 :key="i.name"
                                 @click="selectSecondary(i)"
                                 class="no-tr">{{ i.name }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </header>
          <div class="card-content">
            <DragSort :component="secondaryList.store.$options.related"
                      :classes="secondaryClasses"/>
          </div>
        </div>

        <div class="primary">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title">{{ gallery.name }}</h2>
            </header>
            <div class="card-content imagesEdit">
              <b-tabs type="is-toggle" v-model="activeTab" position="is-right">
                <b-tab-item icon="images" :disabled="edit.loading">
                  <DragSort :component="gallery.store.$options.related"
                            :classes="classes"/>
                </b-tab-item>
                <b-tab-item icon="upload" :disabled="edit.loading">
                  <FileUpload @image-preview="poule($event)"
                              :gallery="component"
                              :edit="edit"/>
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
  import DragSort from '../../../DragSort';
  import {SpinLine} from 'vue-loading-spinner';
  import FileUpload from '../../FileUpload';
  import ValidationBtns from '../../ValidationButtons';
  import GalleriesEditStore from '../GalleriesEditStore';

  export default {
    name: "ModalLayout",
    components: {DragSort, ValidationBtns, FileUpload, SpinLine},
    props: {
      component: {type: String},
      classes: {type: Array},
      parallaxIdx: {type: Number},
      top: {type: String},
      right: {type: String, default: '88px'},
    },
    data() {
      return {
        edit: GalleriesEditStore,
        primaryList: GalleriesEditStore.state,
        secondaryList: GalleriesEditStore.state.stock,
        secondaryClasses: [
          'level is-mobile', 'level-left',
          'level-item', 'level-item image-slot'
        ],
      };
    },
    computed: {
      gallery() { return this.primaryList[this.component]; },
      activeTab: {
        get() { return this.edit.activeTab; },
        set(value) { this.edit.setActiveTab(value);}
      }
    },
    methods: {
      selectSecondary(secondary) {
        console.log(secondary.name);
        console.log(this.secondaryList.name);
        this.secondaryList = secondary;
        this.updateComponent =
          console.log('UPDATE');
        console.log(this.secondaryList.name);
      },

      poule(e) {
        console.log(`New image:\ngallery: ${e.gallery}\npos: ${e.position}\nimage: ${e.image}`);
        this.gallery.images.push(e);
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../../static/sass/global';

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

  .primary {
    height: 450px;
  }

  .card {
    /*border-radius: 10px;*/
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
