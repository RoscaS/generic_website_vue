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
      selectedArticle: null,
      hasLoaded:false,
    }
  }),
  computed: {
    allArticles() {
      let lst = [];
      this.state.stores.forEach(i => {
        i.articles.forEach(j => {
          lst.push(j)
        })
      });
      return lst;
    }
  },
  methods: {
    fetchData() {
      axios.get(url).then(response => {
        response.data.forEach(i => {
          this.state.stores.push(new Category(i));
        });
        this.state.hasLoaded = true;
      });
    }
  },
  created() {
    this.fetchData();
  }
});

export default CategoriesStore;



