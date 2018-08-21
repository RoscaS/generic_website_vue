import axios from "axios";
import tools from '../../../utiles/tools'
import {Gallery} from './GalleryObject';
axios.defaults.baseURL = 'http://localhost:8000/';

class GalleriesStore {
  constructor() {
    this.name = 'GalleriesStore';
    this.type = 'image';
    this.state = {
      stores: [
        new Gallery('Carousel'),
        new Gallery('Promo'),
        new Gallery('Presentation'),
        new Gallery('Parallax'),
        new Gallery('Events'),
        new Gallery('Stock'),
        new Gallery('Articles'),
      ],
      activeTab: 0,
      loading: false,
      active: null,
      primaryStore: null,
      secondaryStore: null,
      selectedImage: null,
      carouselAutoScroll: false,
    };
  }
  get loading() {return this.state.loading;}
  set loading(value) {this.state.loading = value;}

  get activeTab() { return this.state.activeTab; }
  set activeTab(value) { this.state.activeTab = value; }

  get primaryStore() { return this.state.primaryStore; }
  set primaryStore(store) { this.state.primaryStore = store; }

  get secondaryStore() { return this.state.secondaryStore; }
  set secondaryStore(store) { this.state.secondaryStore = store; }

  get carouselAutoScroll() {return this.state.carouselAutoScroll;}
  set carouselAutoScroll(value) {this.state.carouselAutoScroll = value;}

  get selectedImage () { return this.state.selectedImage; }
  set selectedImage (image) { this.state.selectedImage = image; }

  setLoading() {this.state.loading = true;}

  unsetLoading() {this.state.loading = false;}

  clearSelectedImage() {this.state.selectedImage = null;}

  getStore(name) {return this.state.stores.filter(i => i.name == name)[0];}

  getImage(gallery, id) {
    let store = this.getStore(gallery);
    if (store.hasLoaded) return store.images.find(i => i.id == id);
    else return setTimeout(() => {this.getImage(gallery, id)}, 500);
  }
  toggleLoading(message) {
    this.setLoading();
    setTimeout(() => {
      this.unsetLoading();
      if (message == 'imageUp') {
        setTimeout(() => {
          this.activeTab = 0;
        }, 500);
        tools.message(message)
      }
    }, 2000);
  }
  uploadImage(form, store) {
    this.toggleLoading('imageUp');
    store.postImage(form);
  }
  update() {
    this.primaryStore.update();
    this.secondaryStore.update();
  }
  start(store) {
    if (this.state.stores.includes(store)) {
      this.state.active = store;
    }
  }
  end() {
    this.state.active = null
  }
}

export default new GalleriesStore;
