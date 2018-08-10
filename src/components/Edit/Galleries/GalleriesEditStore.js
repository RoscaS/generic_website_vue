import BuildGalleriesStores from './GalleriesStores'
import axios from "axios";
import Vue from 'vue';

const GalleriesEditStore = new Vue({
  name: 'GalleriesEditStore',
  data: {
    state: new BuildGalleriesStores,
    SecondaryStore: null,
    ActiveTab: 0,
    Loading: false,
  },

  computed: {
    secondaryStore: {
      get() { return this.SecondaryStore; },
      set(store) { this.SecondaryStore = store; }
    },
    activeTab: {
      get() { return this.ActiveTab; },
      set(value) { this.ActiveTab = value; }
    },
    loading: {
      get() { return this.Loading; },
      set(value) { this.Loading = value; }
    },
  },

  methods: {
    getStore(name) {
      return this.state.filter(i => i.related == name)[0];
    },
    fetchData(store = null) {
      let stores = store? [store] : this.state;
      stores.forEach(i => {
        axios.get(i.url).then(response => {
          i.state.images.length = 0;
          this.pushImage(i, response.data.images);
          console.log(response.data.images)
        }).catch(error => {
          console.log(`${this.url}\n${error}`);
        });
      });
    },
    pushImage(store, images) {
      this.buildImagesList(store, images);
      this.sortByPosition(store);
    },
    buildImagesList(store, images) {
      images.forEach(i => {
        store.state.images.push({
          url: i.image,
          name: i.name,
          description: i.description,
          position: i.position,
          id: i.id,
          gallery: i.gallery,
        });
      });
    },
    sortByPosition(store) {
      let images = store.state.images;
      images = images.sort((a, b) => {
        return a.position - b.position;
      });
    },
    update() {
      this.loading = true;
      this.state.forEach(i => {
        console.log(`update: ${i.related}`)
        this.updatePosition(i);
        this.updateGallery(i);
        this.patchData(i);
      });
      setTimeout(() => {
        this.$Global.Tools.message(1);
        this.loading = false;
      }, 2000);
    },
    updateGallery(store) {
      store.state.images.forEach(i => {
        i.gallery = store.string;
      });
    },
    updatePosition(store) {
      if (store.state.images.length) {
        for (let i = 0; i < store.state.images.length; i++) {
          store.state.images[i].position = i + 1;
        }
      }
    },
    patchData(store) {
      let images = store.state.images;
      images.forEach(i => {
        let url = `images/${i.id}/`;
        axios.patch(url, this.getForm(i, store), {
          headers: {'content-type': 'multipart/form-data'}
        }).then((response) => {
          console.log(`OK: patchData: ${store.related}`);
        }).catch(error => {
          console.log(url);
          console.log(error);
        });
      });
    },
    getForm(images, store) {
      let formData = new FormData();
      formData.append('id', images.id);
      formData.append('position', images.position);
      formData.append('gallery', store.string);
      return formData;
    },
  },
});

export default GalleriesEditStore;

