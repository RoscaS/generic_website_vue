import axios from "axios";
import Vue from 'vue';
import tools from '../../../utiles/tools';
import {Category} from "./CategoryObject";
axios.defaults.baseURL = 'http://localhost:8000/';
const url = 'categories/';

const CategoriesStore = new Vue ({
  data: () => ({
    name: 'CategoriesStore',
    type: 'article',
    state: {
      stores: [],
      activeTab: 0,
      loading: false,
      hasLoaded:false,
      active:false,

      editPopup: null,
      selectedCategory: null,
      hoveredImage: null,

      primaryStore: null,
      secondaryStore: null,
    }
  }),
  methods: {
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
      for (let i = 0; i < this.state.stores.length; i++) {
        if (this.state.stores[i].position != i + 1) {
          this.state.stores[i].position = i + 1;
          this.state.stores[i].put();
        }
      }
    },
    sortByPosition() {
      this.state.stores.sort((a, b) => {
        return a.position - b.position;});
    },
    clearEditPopup() {
      this.state.editPopup = false;
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



