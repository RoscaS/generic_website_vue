import axios from "axios";
import tools from '../../../utils/tools';
import urls from '../../../routes/Urls';
import CategoriesStore from './CategoriesStore';
import {Article} from "./ArticleObject";
import {Dialog} from "buefy";

const headers = {headers: {'content-type': 'multipart/form-data'}};


class Category {
  constructor(category) {
    this.type = 'category';
    this.id = category.id;
    this.slug = category.slug;
    this.name = category.name;
    this.description = category.description;
    this.position = category.position;
    this.url = urls.categories + category.slug + '/';
    this.articles = [];
    this.backup = {};
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

  setBackup() {
    this.backup.slug = this.slug;
    this.backup.name = this.name;
    this.backup.description = this.description;
    this.backup.url = urls.categories + this.slug + '/';
  }

  restore() {
    this.slug = this.backup.slug;
    this.name = this.backup.name;
    this.description = this.backup.description;
    this.url = urls.categories + this.slug + '/';
  }

  updateData() {
    this.edit.sortImages();
    // this.articles.forEach((i, idx) => {
    //   let dirty = false;
    //   if (i.position != idx + 1) {
    //     i.position = idx + 1;
    //     dirty = true;
    //   }
    //   if (i.category != this) {
    //     i.category = this;
    //     dirty = true;
    //   }
    //   this.edit.sortImages();
    //
    //   if (dirty) {
    //     i.patch(false);
    //   }
    // });
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
    this.edit.setLoading();
    axios.put(this.url, {
      slug: this.name,
      name: this.name,
      description: this.description,
      position: this.position,
    }).then(() => {
      this.slug = this.name;
      this.url = urls.categories + this.slug + '/';
      setTimeout(() => {
        tools.message('updated');
        this.edit.unsetLoading();
      }, 1500);
    }).catch(() => {tools.message('error');});
  }

  postArticle(article) {
    this.edit.setLoading();
    let form = this.getForm(article);
    this.edit.sortImages();
    axios.post('articles/', form, headers).then(response => {
      this.initArticles([response.data]);
      this.edit.state.tempImage.gallery = 'Articles';
      this.edit.state.tempImage.name = response.data.name;
      setTimeout(() => {
        tools.message('articleNew');
        this.edit.unsetLoading();
        this.edit.state.newItem = null;
        this.edit.state.tempImage = null;
      }, 2000);
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
      message: `Cette opération supprimera la catégorie ${this.name}
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
