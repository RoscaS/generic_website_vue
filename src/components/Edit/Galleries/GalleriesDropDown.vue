<template>
  <b-dropdown mobile-modal>
    <button class="button is-info" slot="trigger">
      <p>{{ secondaryStore.name }}</p>
      <i class="fa fa-fw fa-sort-down"></i>
    </button>
    <b-dropdown-item v-for="gallery in dropDown"
                     :key="gallery.name"
                     class="no-tr"
                     @click="secondaryStore = gallery"
                     :disabled="disabled(gallery)">
      <div class="level">
        <div class="level-left">
          <div style="float: left">
            {{ gallery.name }}
          </div>
        </div>
        <div class="level-righ">
          <div style="float: right">
            <ImagesCounter class="image-counter" :store="gallery"/>
          </div>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
  import GalleriesStore from './GGalleriesStore';
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
        set(store) { this.edit.secondaryStore = store;} ,
      },
      dropDown() {
        return this.edit.state.galleries.filter(i => i != this.store)
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
