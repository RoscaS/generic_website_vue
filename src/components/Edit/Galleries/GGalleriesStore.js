import axios from "axios";
import tools from '../../../utiles/tools'
import {Gallery} from './BBuildGalleriesStores';

axios.defaults.baseURL = 'http://localhost:8000/';

// const galleries = [
//   'Stock', 'Carousel', 'Events', 'Parallax'
// ];


class GalleriesStore {
  constructor() {
    this.name = 'GalleriesStore';
    this.type = 'image';
    this.state = {
      galleries: [],
      activeTab: 0,
      loading: false,
      primaryStore: null,
      secondaryStore: null,
      selectedImage: null,
      carouselAutoScroll: false,
    };
    this.fetchData();
  }

  getGallery = name => this.state.galleries.filter(i => i.name == name)[0];

  setLoading = () => this.state.loading = true;
  unsetLoading = () => this.state.loading = false;
  clearSelectedImage = () => this.state.selectedImage = null;

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

  fetchData() {
    axios.get('galleries/').then(response => {
      response.data.forEach(i => { this.setData(i); });
    });
  }

  setData(data) {
    this.state.galleries.push(new Gallery(data));
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
    tools.message('imageMoved');
  }

}

export default new GalleriesStore;
