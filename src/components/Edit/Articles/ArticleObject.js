import axios from "axios";
import Vue from 'vue';
import tools from '../../../utiles/tools';
import GalleriesStore from '../Galleries/GalleriesStore'
import {Name, Price, Description} from "../FieldsModels";
axios.defaults.baseURL = 'http://localhost:8000/';
const headers = {headers: {'content-type': 'multipart/form-data'}};


// class AArticle {
//   constructor(article, category) {
//     this.id = article.id;
//     this.name = new Name(article.name);
//     this.price = new Price(article.price);
//     this.position = article.position;
//     this.category = category;
//     this.description = new Description(article.description, 200, 2);
//     this.image = GalleriesStore.getImage('Articles', article.image);
//   }
//
// }

function Article(article, category) {
  return new Vue ({
    data: () => ({
      id: article.id,
      name: new Name(article.name),
      price: new Price(article.price),
      position: article.position,
      category: category,
      description: new Description(article.description, 200, 2),
      image: article.image,
      // imageId: article.image,
    }),
    computed: {
      // galleriesStore() { return GalleriesStore; },
      // image() {return this.galleriesStore.getImage('Articles', this.imageId) }
    }
  })
}


export {Article}
