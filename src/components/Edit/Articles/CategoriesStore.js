import axios from "axios";
import Vue from 'vue';
import tools from '../../../utiles/tools';
import {Category} from "./CategoryObject";
import GalleriesStore from "../Galleries/GalleriesStore";

axios.defaults.baseURL = 'http://localhost:8000/';
const url = 'categories/';

const CategoriesStore = new Vue({
  data: () => ({
    name: 'CategoriesStore',
    state: {
      stores: [],
      activeTab: 0,
      loading: false,
      hasLoaded: false,
      active: false,

      newItem: null,
      tempImage: null,
      hoveredImage: null,
      editItem: null,

      primaryStore: null,
      secondaryStore: null,

      draggingType: null,
    }
  }),
  computed : {
    loading: {
      get(){return this.state.loading;},
      set(value) {this.state.loading = value;}
    },
  },
  methods: {
    getStore(name) {return this.state.stores.filter(i => i.name.data == name)[0];},

    setLoading() {this.state.loading = true;},
    unsetLoading() {this.state.loading = false;},
    fetchData() {
      axios.get(url).then(response => {
        response.data.forEach(i => {
          this.state.stores.push(new Category(i));
        });
        this.sortByPosition();
        this.state.hasLoaded = true;
      });
    },
    createCategory(data) {
      this.setLoading();
      axios.post(`categories/`, data).then(response => {
        this.state.stores.push(new Category(response.data));
        setTimeout(() => {
          tools.message('categoryNew');
          this.unsetLoading();
          this.clearNewItem();
        }, 1500);
      });
    },
    updatePosition() {
      this.setLoading();
      this.state.stores.forEach((i, idx) => {
        if (i.position != idx + 1) {
          i.position = idx + 1;
          i.put();
        }
      });
      setTimeout(() => {
        tools.message('updated');
        this.unsetLoading();
      }, 1500);
    },
    sortByPosition() {
      this.state.stores.sort((a, b) => {
        return a.position - b.position;
      });
    },
    clearEditItem() {
      if (!this.state.loading) this.state.editItem = null;
      else setTimeout(() => {this.clearEditItem();}, 500);
    },
    clearNewItem() {
      if (!this.loading) this.state.newItem = null;
      else setTimeout(() => {this.clearNewItem()}, 500);
    },
    removeCategory(category) {
      let idx = this.state.stores.indexOf(category);
      this.state.stores.splice(idx, 1);
    },
    uploadImage(file) {
      let gallery = GalleriesStore.getStore('Articles');
      gallery.postImage(this.getForm(file, gallery.name));
      setTimeout(() => {
        let image = gallery.images[gallery.images.length-1];
        if (image.name == 'tempArticleImage') this.state.tempImage = image;
        console.log(this.state.tempImage);
      }, 500);
    },
    getForm(file, gallery) {
      let formData = new FormData();
      formData.append('name', 'tempArticleImage');
      formData.append('image', file);
      formData.append('gallery', gallery);
      return formData;
    },
    start(store) {
      this.state.active = true;
    },
    end() {
      this.state.active = false;
    }
  },
  created() {
    this.fetchData();
  }
});

export default CategoriesStore;



