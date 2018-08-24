import axios from "axios";
import Vue from 'vue';
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
    this.image = article.image;
  }

  patch() {
    axios.patch(`articles/${this.id}/`, this.getForm(), headers)
    .then(response => {console.log(response)});
  }

  getForm() {
    let formData = new FormData();
    formData.append('id', this.id);
    formData.append('name', this.name.data);
    formData.append('price', this.price.data);
    formData.append('position', this.position);
    formData.append('category', this.category.name.data);
    formData.append('description', this.description.data);
    return formData;
  }
}

// function Article(article, category) {
//   return new Vue ({
//     data: () => ({
//       id: article.id,
//       name: new Name(article.name),
//       price: new Price(article.price),
//       position: article.position,
//       category: category,
//       description: new Description(article.description, 200, 2),
//       image: article.image,
//     }),
//     computed: {
//       // galleriesStore() { return GalleriesStore; },
//       // image() {return this.galleriesStore.getImage('Articles', this.imageId) }
//     }
//   })
// }


export {Article}
