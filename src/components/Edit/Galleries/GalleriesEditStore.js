import axios from "axios";
import Vue from 'vue';
import GalleryImagesStore from '../../../views/Gallery/GalleryImagesStore';
import CarouselImagesStore from '../../../views/Carousel/CarouselImagesStore';
import ParallaxImagesStore from '../../Parallax/ParallaxImagesStore'
import StockImagesStore from '../Stock/StockImagesStore';

const GalleriesEditStore = new Vue({
  name: 'GalleriesEditStore',
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

    activeTab: 0,

    pushSignal: false,
    cancelSignal: false,
    updateSignal: false,

    reOrder: false
  },
  computed: {

  },

  methods: {
    setComponent(value) { this.component = value; },
    setLoading(value) { this.loading = value; },
    setDirty(value) { this.dirty = value; },

    setActiveTab(value) { this.activeTab = value; },

    sendPushSignal() {
      this.loading = true;
      this.pushSignal = true;
      setTimeout(() => { this.pushSignal = false; }, 10);
    },
    sendUpdateSignal() {
      this.loading = true;
      this.updateSignal = true;
      setTimeout(() => { this.updateSignal = false }, 10);
    },
    sendCancelSignal() {
      this.cancelSignal = true;
      setTimeout(() => { this.cancelSignal = false; }, 10);
    },

    updateAll() {
      for (let i in this.state) {
        let images = this.state[i].store.state.images;
        let gallery = this.state[i].store.$options.related.toLowerCase();
        gallery == 'gallery'? gallery = 'events' : null;
        console.log(gallery)
        for (let j in images) {
          let url = `images/${images[j].id}/`;
          let formData = new FormData();
          formData.append('id', images[j].id);
          formData.append('position', images[j].position);
          formData.append('gallery', images[j].gallery.toLowerCase());

          axios.patch(url, formData, {
            headers: {'content-type': 'multipart/form-data'}
          }).then((response) => {
            console.log('putData: ok');
          }).catch(error => {
            console.log(url);
            console.log(error);
          })
        }
      }
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

