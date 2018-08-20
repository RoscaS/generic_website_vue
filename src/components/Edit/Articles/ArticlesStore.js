import axios from "axios";
import {Category} from './ArticleObject';

axios.defaults.baseURL = 'http://localhost:8000/';

class ArticlesStore {
  constructor() {
    this.name = 'ArticlesStore';
    this.type = 'articles';
    this.state = {
      categories: [],
      activeTab: 0,
      loading: false,
    };
    this.fetchData();
  }

  fetchData() {
    axios.get('category/').then(response => {
      response.data.forEach(category => {
        this.state.categories.push(new Category(category));
      });
    }).catch(error => {console.log(error);})
  };

}


export default new ArticlesStore;
