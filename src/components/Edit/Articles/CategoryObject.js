import axios from "axios";
import tools from '../../../utiles/tools';
import CategoriesStore from './CategoriesStore';
import {Description, Name} from "../FieldsModels";
import {Article} from "./ArticleObject";
import {Dialog} from "buefy";

axios.defaults.baseURL = 'http://localhost:8000/';
const headers = {headers: {'content-type': 'multipart/form-data'}};


class Category {
  constructor(category) {
    this.type = 'category';
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

  get edit() {return CategoriesStore;};

  count() { return this.articles.length;};
  isFull() { return this.count() >= this.limit; }
  lock() {this.isLocked = true;}
  unlock() {this.isLocked = false;}

  removeArticle(article) {
    this.articles.splice(this.articles.indexOf(article), 1);
  }

  initArticles(articles) {
    if (articles) {
      articles.forEach(i => {
        this.articles.push(new Article(i, this));
      });
    }
  }

  updateData() {
    this.articles.forEach((i, idx) => {
      let dirty = false;
      if (i.position != idx + 1) {
        i.position = idx + 1;
        dirty = true;
      }
      if (i.category != this) {
        i.category = this;
        dirty = true;
      }
      if (dirty) {
        i.patch(false);
      }
    });
  }

  sortByPosition() {
    this.articles.sort((a, b) => {return a.position - b.position;});
  }

  getForm(article) {
    let formData = new FormData();
    formData.append('name', article.name);
    formData.append('image', article.file);
    formData.append('category', article.category);
    formData.append('description', article.description);
    formData.append('price', article.price);
    formData.append('image', article.image);
    return formData;
  }

  put() {
    axios.put(this.url, {
      slug: this.name.data,
      name: this.name.data,
      description: this.description.data,
      position: this.position,
    }).then(() => {
      this.slug = this.name.data;
    }).catch(() => {tools.message('error');});
  }

  postArticle(article) {
    this.edit.setLoading();
    let form = this.getForm(article);
    axios.post('articles/', form, headers).then(response => {
      this.initArticles([response.data]);
      this.edit.state.tempImage.gallery = 'Articles';
      this.edit.state.tempImage.name = response.data.name.data;
      setTimeout(() => {
        tools.message('articleNew');
        this.edit.unsetLoading();
        this.edit.state.newItem = null;
        this.edit.state.tempImage = null;
      }, 500);
    }).catch(error => {
      tools.message('error');
      this.edit.state.tempImage.delete(false);
    })
  }

  delete(notification = true) {
    if (notification) {
      this.deleteNotification();
    } else {
      this.deleteCategory(false);
    }
  }

  deleteNotification() {
    Dialog.confirm({
      message: `Cette opération supprimera la catégorie ${this.name.data}
      ainsi que tous les articles qu'elle contient`,
      confirmText: 'Supprimer la catégories',
      cancelText: 'Annuler',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {this.deleteCategory();},
    });
  }

  deleteCategory(message = true) {
    let timer = 0;
    this.articles.forEach(i => {
      setTimeout(() => {i.delete(false)}, timer);
      timer += 100;
    });
    setTimeout(() => {
      CategoriesStore.removeCategory(this);
      axios.delete(this.url);
    }, 1000);
    if (message) tools.message('categoryDel');
  }

}

export {Category};
