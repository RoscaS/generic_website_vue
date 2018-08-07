import Vue from 'vue';
import GalleryImagesStore from '../../../views/Gallery/GalleryImagesStore';
import CarouselImagesStore from '../../../views/Carousel/CarouselImagesStore';
import ParallaxImagesStore from '../../Parallax/ParallaxImagesStore'
import StockImagesStore from './Stock/StockImagesStore';

const GalleriesEditStore = new Vue({
  data: {
    state: {
      stock: {name: 'Stock', images: StockImagesStore.state.images, store: StockImagesStore},
      carousel: {name: 'Carousel', images: CarouselImagesStore.state.images, store: CarouselImagesStore},
      gallery: {name: 'Galerie', images: GalleryImagesStore.state.images, store: GalleryImagesStore},
      parallax: {name: 'Parallax', images: ParallaxImagesStore.state.images, store: ParallaxImagesStore},
    },

    component: null,
    loading: false,
    active: false,
    dirty: false,

    pushSignal: false,
    cancelSignal: false,

    updateSignal: false,

    reOrder: false
  },
  wacth: {
  //  watch here for change in galleries and force compo to reload
  },

  methods: {
    setComponent(value) { this.component = value; },
    setLoading(value) { this.loading = value; },
    setDirty(value) { this.dirty = value; },

    sendPushSignal() {
      this.loading = true;
      this.pushSignal = true;
      setTimeout(() => { this.pushSignal = false; }, 10);
    },
    sendCancelSignal() {
      this.cancelSignal = true;
      setTimeout(() => { this.cancelSignal = false; }, 10);
    },
    sendUpdateSignal() {
      this.updateSignal = true;
      setTimeout(() => { this.updateSignal = false; }, 10);
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

