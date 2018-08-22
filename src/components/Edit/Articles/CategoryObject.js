import axios from "axios";
import tools from '../../../utiles/tools';
import GalleriesStore from '../Galleries/GalleriesStore';
import {Description, Name} from "../FieldsModels";
import {Article} from "./ArticleObject";
axios.defaults.baseURL = 'http://localhost:8000/';
const headers = {headers: {'content-type': 'multipart/form-data'}};


class Category {
  constructor(category) {
    this.id = category.id;
    this.slug = category.slug;
    this.name = new Name(category.name);
    this.description = new Description(category.description, 1000, 4);
    this.position = category.position;
    this.url = `category/${category.slug}`;
    this.articles = [];
    this.initArticles(category.articles);
  }

  initArticles(articles) {
    articles.forEach(i => {
      this.articles.push(Article(i, this));
    });
  }

  count() { return this.articles.length;};

  isFull() { return this.count() >= this.limit; }

  lock() {this.isLocked = true;}

  unlock() {this.isLocked = false;}

}

export {Category};
