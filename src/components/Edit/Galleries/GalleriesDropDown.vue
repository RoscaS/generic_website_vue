<template>
  <b-dropdown mobile-modal>
    <button class="button is-info" slot="trigger">
      <p>{{ secondaryStore.title }}</p>
      <i class="fa fa-fw fa-sort-down"></i>
    </button>
    <b-dropdown-item v-for="gallery in dropDown"
                     :key="gallery.name"
                     class="no-tr"
                     @click="secondaryStore = gallery"
                     :disabled="disabled(gallery)">
      {{ gallery.title }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
  import GalleriesEditStore from './GalleriesEditStore';

  export default {
    name: "GalleriesDropDown",
    props: {
      store: {type: Object}
    },
    data() {
      return {
        edit: GalleriesEditStore,
      };
    },
    computed: {
      secondaryStore: {
        get() { return this.edit.secondaryStore; },
        set(store) { this.edit.secondaryStore = store;} ,
      },
      dropDown() {
        return this.edit.state.filter(i => i != this.store)
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
</style>
