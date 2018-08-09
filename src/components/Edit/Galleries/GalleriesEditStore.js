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
  computed: {},

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
      setTimeout(() => { this.updateSignal = false; }, 10);
    },
    sendCancelSignal() {
      this.cancelSignal = true;
      setTimeout(() => { this.cancelSignal = false; }, 10);
    },

    fetchAll() {
      for (let i in this.state) {
        console.log('ici');
        let gallery = this.stock[i];
        axios.get(gallery.url).then(response => {
          this.buildStore(gallery, response);
          // gallery.fetchFlag = true;
        }).catch(error => {
          console.log(`${this.url}\n${error}`);
        });
      }
    },

    updateAll() {
      for (let i in this.state) {
        let images = this.state[i].store.state.images;
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
          });
        }
      }
    },
    buildStore(gallery, response) {
      gallery.store.length = 0;
      response.data.images.forEach(image => {
        gallery.store.push({
          url: image.image,
          name: image.name,
          description: image.description,
          position: image.position,
          id: image.id,
          gallery: image.gallery,
        });
      });
      this.sortByPosition(gallery.store);
    },
    sortByPosition(gallery) {
      gallery = gallery.sort((a, b) => {
        return a.position - b.position;
      });
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

