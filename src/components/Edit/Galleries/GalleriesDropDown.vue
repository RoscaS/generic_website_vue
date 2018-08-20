<template>
  <b-dropdown mobile-modal>
    <button class="button is-info" slot="trigger">
      <p>{{ secondaryStore.name }}</p>
      <i class="fa fa-fw fa-sort-down"></i>
    </button>
    <b-dropdown-item v-for="gallery in mainGalleries"
                     :key="gallery.name"
                     class="no-tr"
                     @click="secondaryStore = gallery"
                     :disabled="disabled(gallery)">
      <div class="level">
        <div class="level-left">
          {{ gallery.name }}
        </div>
        <div class="level-righ">
          <ImagesCounter class="image-counter" :store="gallery"/>
        </div>
      </div>
    </b-dropdown-item>

    <b-dropdown-item separator></b-dropdown-item>

    <b-dropdown-item v-for="gallery in miscGalleries"
                     :key="gallery.name"
                     class="no-tr"
                     @click="secondaryStore = gallery"
                     :disabled="disabled(gallery)">
      <div class="level">
        <div class="level-left">
          {{ gallery.name }}
        </div>
        <div class="level-righ">
          <ImagesCounter class="image-counter" :store="gallery"/>
        </div>
      </div>
    </b-dropdown-item>

    <b-dropdown-item separator></b-dropdown-item>

    <b-dropdown-item v-for="gallery in articlesGalleries"
                     :key="gallery.name"
                     class="no-tr"
                     @click="secondaryStore = gallery"
                     :disabled="disabled(gallery)">
      <div class="level">
        <div class="level-left">
          {{ gallery.name }}
        </div>
        <div class="level-righ">
          <ImagesCounter class="image-counter" :store="gallery"/>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
  import GalleriesStore from './GalleriesStore';
  import ImagesCounter from './ImagesCounter';

  export default {
    name: "GalleriesDropDown",
    components: {ImagesCounter},
    props: {
      store: {type: Object},
    },
    data() {
      return {
        edit: GalleriesStore,
      };
    },
    computed: {
      secondaryStore: {
        get() { return this.edit.secondaryStore; },
        set(store) { this.edit.secondaryStore = store;},
      },
      mainGalleries() {
        let galleries = ['Stock', 'Carousel', 'Events', 'Parallax'];
        return this.edit.state.stores.filter(i => {
          return i != this.store && galleries.includes(i.name)
        });
      },
      miscGalleries() {
        let galleries = ['Presentation', 'Promo'];
        return this.edit.state.stores.filter(i => {
          return i != this.store && galleries.includes(i.name)
        });
      },
      articlesGalleries() {
        let galleries = ['Articles'];
        return this.edit.state.stores.filter(i => {
          return i != this.store && galleries.includes(i.name)
        });
      },
    },
    methods: {
      disabled(gallery) {
        return this.secondaryStore == gallery;
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .level-left {
    font-size: 16px;
  }

  .image-counter {
    margin-right: -28px;
  }

  button {
    p {
      font-weight: bold;
      color: white;
      font-size: 16px;
      margin-top: -3px;
    }
    i {
      margin-top: -22px;
      margin-left: 5px;
    }
  }
</style>
