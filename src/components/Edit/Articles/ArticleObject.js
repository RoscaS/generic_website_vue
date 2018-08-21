import axios from "axios";
import tools from '../../../utiles/tools';
import GalleriesStore from '../Galleries/GalleriesStore'
import {Name, Price, Description} from "../FieldsModels";
axios.defaults.baseURL = 'http://localhost:8000/';
const headers = {headers: {'content-type': 'multipart/form-data'}};


class Article {
  constructor(article, category) {
    this.id = article.id;
    this.name = new Name(article.name);
    this.price = new Price(article.price);
    this.position = article.position;
    this.category = category;
    this.description = new Description(article.description, 200, 2);
    this.image = GalleriesStore.getImage('Articles', article.image);
    setTimeout(() => {console.log(this);}, 500);
  }
}


export {Article}
