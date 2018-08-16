import axios from "axios";
import Galleries from './BuildGalleriesStores';

axios.defaults.baseURL = 'http://localhost:8000/';


class GalleriesStore {
  constructor() {
    this.name = 'GalleriesStore';
    this.type = 'image';
    this.state = new Galleries;

    this.ActiveTab = 0;
    this.Loading = false;
    this.SecondaryStore = null;
    this.SelectedImage = null;
  };

  // fetchData() {
  //
  // }
}
