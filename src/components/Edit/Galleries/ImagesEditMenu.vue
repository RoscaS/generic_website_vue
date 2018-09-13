<template>
  <section>
    <div class="loading-animation">
      <SpinLine v-show="edit.loading"/>
    </div>

    <ImagesCard :edit="edit"/>

    <div class="content">
      <transition name="fade">
        <div v-if="!edit.editItem">
          <h1 class="menu-title">Edition: {{ store.name }}</h1>

          <div class="card primary">
            <header class="card-header">
              <h2 class="store-name">{{ store.name}}</h2>
              <ImagesCounter class="img-counter" :store="store"
                             :verbose="true"/>
              <GalleryOptions class="img-options" :store="store"/>
            </header>
            <div class="card-content images-edit-tabs">
              <b-tabs type="is-toggle"
                      v-model="edit.activeTab"
                      position="is-right">
                <b-tab-item icon="images" :disabled="edit.loading">
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
              <GalleriesDropDown class="gallery-dropdown" :store="store"/>
              <ImagesCounter class="img-counter"
                             :store="edit.secondaryStore"
                             :verbose="true">
              </ImagesCounter>
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
import SpinLine from "../../LoadingSpinner";
import DragSortImages from "./DragSortImages";
import Upload from "../Upload";
import GalleriesStore from "./GalleriesStore";
import GalleriesDropDown from "./GalleriesDropDown";
import GalleryOptions from "./GalleryOptions";
import ImagesCard from "./ImagesCard";
import ImagesCounter from "./ImagesCounter";

const parallaxHelp = `
    Cette gallerie contient les images entre les sections du site. Il est important
    qu'elle soit remplie.
    `;
const galleriesHelp = `
    Affin d'assurer la cohérence et la qualité d'affichage il est recommandé
    d'utiliser des images dont la hauteur est au maximum aussi grande que la largeur.
    De plus la résolution doit être maximisée sans aller dans l'extrème (idéalement, un poids
    entre 0.5mo et 1mo).
    `;

export default {
  name: "ImagesEditMenu",
  components: {
    Upload,
    DragSortImages,
    GalleriesDropDown,
    SpinLine,
    GalleryOptions,
    ImagesCard,
    ImagesCounter
  },
  props: {
    store: { type: Object }
  },
  data: () => ({}),
  computed: {
    edit() {
      return GalleriesStore;
    },
    conditions() {
      let storeConditions = this.store.isFull() && !this.store.isEmpty;
      return this.edit.loading || storeConditions;
    }
  },
  methods: {
    uploadImage(file) {
      let formData = new FormData();
      formData.append("image", file);
      formData.append("name", `${this.store.name}_${this.store.count()}`);
      formData.append("gallery", this.store.name);
      this.store.postImage(formData);
    }
  },
  created() {
    this.edit.primaryStore = this.store;
    this.edit.secondaryStore = this.edit.getStore("Stock");
    setTimeout(() => {
      this.$snackbar.open({
        message: galleriesHelp,
        type: "is-success",
        position: "is-top",
        actionText: "Ok",
        queu: "true",
        indefinite: true,
        onAction: () => {
          if (this.store.name === "Parallax") {
            setTimeout(() => {
              this.$snackbar.open({
                message: parallaxHelp,
                type: "is-success",
                position: "is-top",
                actionText: "Ok",
                indefinite: true
              });
            }, 500);
          }
        }
      });
    }, 500);
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

.content {
  .menu-title {
    position: relative;
    color: white;
  }
  .card {
    border-radius: 8px;
    margin-bottom: 60px;
    width: 960px;
    border: 1px solid black;
    &.primary {
      header {
        user-select: none;
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 100%;
        .store-name {
          margin: 0;
        }
        .img-counter {
          margin: 0 15px -8px 15px;
        }
        .img-options {
          margin: 3px 0 0 0;
        }
      }
    }
    &.secondary {
      header {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 100%;
        .gallery-dropdown {
        }
        .img-counter {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
