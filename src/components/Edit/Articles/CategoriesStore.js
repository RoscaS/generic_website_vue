import axios from "axios";
import Vue from 'vue';
import tools from '../../../utiles/tools';
import {Category} from "./CategoryObject";

axios.defaults.baseURL = 'http://localhost:8000/';
const url = 'categories/';

const CategoriesStore = new Vue({
  data: () => ({
    name: 'CategoriesStore',
    type: 'article',
    state: {
      stores: [],
      activeTab: 0,
      loading: false,
      hasLoaded: false,
      active: false,

      editPopup: null,
      selectedCategory: null,
      hoveredImage: null,

      primaryStore: null,
      secondaryStore: null,

      draggingType: null,
    }
  }),
  methods: {
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
    updatePosition() {
      this.state.stores.forEach((i, idx) => {
        if (i.position != idx + 1) {
          i.position = idx + 1;
          i.put();
        }
      });
    },
    sortByPosition() {
      this.state.stores.sort((a, b) => {
        return a.position - b.position;
      });
    },
    clearEditPopup() {
      if (!this.state.loading) this.state.editPopup = false;
      else setTimeout(() => {this.clearEditPopup();}, 500);
    },
    removeCategory(category) {
      let idx = this.state.stores.indexOf(category);
      this.state.stores.splice(idx, 1);
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



