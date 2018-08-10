import axios from "axios";
import Vue from 'vue';
import EventsImagesStore from '../../../views/Events/EventsImagesStore';
import CarouselImagesStore from '../../../views/Carousel/CarouselImagesStore';
import ParallaxImagesStore from '../../Parallax/ParallaxImagesStore';
import StockImagesStore from '../Stock/StockImagesStore';

const GalleriesEditStore = new Vue({
  name: 'GalleriesEditStore',
  data: {
    state: {
      stock: StockImagesStore,
      carousel: CarouselImagesStore,
      events: EventsImagesStore,
      parallax: ParallaxImagesStore
    },

    sortingStores: {
      primary: null,
      secondary: StockImagesStore
    },

    DirtyStores: [],
    ActiveTab: 0,
    Loading: false,

    component: '',
    active: false,

    pushSignal: false,
    cancelSignal: false,
    updateSignal: false,

    reOrder: false
  },

  computed: {
    primaryStore: {
      get() { return this.sortingStores.primary; },
      set(store) { this.sortingStores.primary = store; }
    },
    secondaryStore: {
      get() { return this.sortingStores.secondary; },
      set(store) { this.sortingStores.secondary = store; }
    },
    dirtyStores: {
      get() { return this.getDirtyList(); },
      set(value) { this.DirtyStores.push(value); }
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
    setComponent(value) { this.component = value; },
    setLoading(value) { this.loading = value; },
    setDirty(value) { this.dirty = value; },

    getDirtyList() {
      let list = [];
      this.DirtyStores.forEach(i => list.push(i.string));
      return list;
    },
    update() {
      for (let i in this.DirtyStores) {
        this.loading = true;
        this.updatePosition(this.DirtyStores[i]);
        this.updateGallery(this.DirtyStores[i]);
        this.patchData(this.DirtyStores[i]);
      }
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
          console.log('OK')
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

    start(component) {
      this.component = component;
      this.active = true;
    },
    end() {
      this.loading = false;
      this.active = false;
      this.component = null;
    },
  },
});

export default GalleriesEditStore;

