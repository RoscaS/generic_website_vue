import { Gallery } from "./GalleryObject";
import Vue from "vue";
import settings from "../../../site-settings";
import urls from '../../../urls';
import axios from "../../../http";


const GalleriesStore = new Vue({
  data: () => ({
    name: "GalleriesStore",
    state: {
      stores: [
        new Gallery("Carousel"),
        new Gallery("Promo"),
        new Gallery("Presentation"),
        new Gallery("Parallax"),
        new Gallery("Events"),
        new Gallery("Stock"),
        new Gallery("Articles")
      ],
      activeTab: 0,
      loading: false,
      active: null,
      primaryStore: null,
      secondaryStore: null,
      editItem: null,
      carouselAutoScroll: false
    }
  }),
  computed: {
    logo: {
      get() {return settings.logo ? settings.logo : false;}
    },
    stores: {
      get() {return this.state.stores;}
    },
    active: {
      get() {return this.state.active;},
      set(value) {this.state.active = value;}
    },
    loading: {
      get() {return this.state.loading;},
      set(value) {this.state.loading = value;}
    },
    activeTab: {
      get() {return this.state.activeTab;},
      set(value) {this.state.activeTab = value;}
    },
    primaryStore: {
      get() {return this.state.primaryStore;},
      set(value) {this.state.primaryStore = value;}
    },
    secondaryStore: {
      get() {return this.state.secondaryStore;},
      set(value) {this.state.secondaryStore = value;}
    },
    carouselAutoScroll: {
      get() {return this.state.carouselAutoScroll;},
      set(value) {this.state.carouselAutoScroll = value;}
    },
    editItem: {
      get() {return this.state.editItem;},
      set(value) {this.state.editItem = value;}
    }
  },
  methods: {

    setLoading() {this.loading = true;},
    unsetLoading() {this.loading = false;},
    clearEditItem() {this.editItem = null;},
    getStore(name) {
      return this.stores.filter(i => i.name == name)[0];
    },
    getImage(gallery, id) {
      let store = this.getStore(gallery);
      if (store.hasLoaded) return store.images.find(i => i.id == id);
      else
        return setTimeout(() => {
          this.getImage(gallery, id);
        }, 100);
    },

	  initGenericSectionsGallery(section) {
	    this.state.stores.push(new Gallery(section.name))
	  },

    update() {
      this.primaryStore.update();
      this.secondaryStore.update();
    },
    start(store) {
      if (this.stores.includes(store)) {
        this.active = store;
      }
    },
    end() {
      this.activeTab = 0;
      this.state.active = null;
    }
  }
});

export default GalleriesStore;
