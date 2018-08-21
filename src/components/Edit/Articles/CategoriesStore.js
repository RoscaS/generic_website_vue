import axios from "axios";
import tools from '../../../utiles/tools';
import {Category} from "./CategoryObject";

axios.defaults.baseURL = 'http://localhost:8000/';
const url = 'categories/';

class CategoriesStore {
  constructor() {
    this.name = 'CategoriesStore';
    this.type = 'article';
    this.state = {
      stores: [],
      activeTab: 0,
      loading: false,
    };
    this.fetchData();
  }

  fetchData() {
    axios.get(url).then(response => {
      response.data.forEach(i => {
        this.state.stores.push(new Category(i));
      });
    });
  }


}

export default new CategoriesStore;



