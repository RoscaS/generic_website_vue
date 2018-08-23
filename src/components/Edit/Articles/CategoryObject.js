import axios from "axios";
import tools from '../../../utiles/tools';
import {Description, Name} from "../FieldsModels";
import {Article} from "./ArticleObject";
axios.defaults.baseURL = 'http://localhost:8000/';

class Category {
  constructor(category) {
    this.id = category.id;
    this.slug = category.slug;
    this.name = new Name(category.name);
    this.description = new Description(category.description, 1000, 4);
    this.position = category.position;
    this.url = `categories/${category.slug}/`;
    this.articles = [];
    this.initArticles(category.articles);
    this.sortByPosition();
  }

  count() { return this.articles.length;};
  isFull() { return this.count() >= this.limit; }
  lock() {this.isLocked = true;}
  unlock() {this.isLocked = false;}

  initArticles(articles) {
    articles.forEach(i => {
      this.articles.push(Article(i, this));
    });
  }

  sortByPosition() {
    this.articles.sort((a, b) => {return a.position - b.position;});
  }

  put() {
    axios.put(this.url, {
      slug: this.name.data,
      name: this.name.data,
      description: this.description.data,
      position: this.position,
    }).then(response => {
      this.slug = this.name.data;
      console.log(response)
    });
  }


}

export {Category};
