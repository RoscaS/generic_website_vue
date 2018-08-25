import axios from "axios";
import tools from '../../../utiles/tools';
import CategoriesStore from './CategoriesStore';
import GalleriesStore from '../Galleries/GalleriesStore';
import {Name, Price, Description} from "../FieldsModels";
import {Dialog} from "buefy";

axios.defaults.baseURL = 'http://localhost:8000/';
const headers = {headers: {'content-type': 'multipart/form-data'}};


class Article {
  constructor(article, category) {
    this.type = 'article';
    this.url = `articles/${article.id}/`;
    this.id = article.id;
    this.name = new Name(article.name);
    this.price = new Price(article.price);
    this.position = article.position;
    this.category = category;
    this.description = new Description(article.description, 200, 2);
    this.imageId = article.image;
  }
  get image() {return GalleriesStore.getImage('Articles', this.imageId)}
  set image(value) {this.imageId = value}


  get relatedImage() {return GalleriesStore.getImage('Articles', this.image.id);}
  get edit() {return CategoriesStore;};

  patch(message=true) {
    if (this.edit.state.editItem && message) this.edit.setLoading();
    axios.patch(`articles/${this.id}/`, this.getForm(), headers)
    .then( () => {
      if (this.edit.state.editItem && message) {
        setTimeout(() => {
          tools.message('updated');
          this.edit.unsetLoading();
        }, 1500);
      }
    }).catch(() => {tools.message('error')});
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

  delete(notification=true) {
    if (notification) {
      this.deleteNotification()
    } else {
      this.deleteArticle(false)
    }
  }
  deleteNotification() {
    Dialog.confirm({
      message: 'Operation définitive!',
      confirmText: "Supprimer l'article",
      cancelText: 'Annuler',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {this.deleteArticle()},
    });
  }
  deleteArticle(message=true) {
    axios.delete(this.url);
    this.category.removeArticle(this);
    this.relatedImage.delete(false);
    if (message) tools.message('imageDel');
  }
}


export {Article};
