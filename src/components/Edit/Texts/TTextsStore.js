import axios from "axios";
import tools from '../../../utiles/tools'
import BuildTextsStores from './BuildTextsStores';
import {Promo, Presentation} from "../Texts/BBuildTextsStores";

axios.defaults.baseURL = 'http://localhost:8000/';


class TextsStore {
  constructor() {
    this.name = 'TextsEditStore';
    this.type = 'text';
    this.state = {
      stores: [],
      activeTab: 0,
      loading: false,

      active: false,
      Component: null,
    };
    this.fetchData();
  }


  get loading() {return this.state.loading;}
  set loading(value) {this.state.loading = value;}

  get activeTab() { return this.state.activeTab; }
  set activeTab(value) { this.state.activeTab = value; }

  setLoading() {
    this.state.loading = true;
  }
  unsetLoading() {
    this.state.loading = false;
  }

  fetchData(lst = []) {
    axios.get('texts/').then(response => {
      console.log(response.data[0])
      for (let i in response.data[0]) lst.push(response.data[0][i]);
      lst.forEach(i => {
        // this.setData(i);
      });
    });
  }
  setData(data) {
    // this.state.stores.
  }
}

export default new TextsStore;
