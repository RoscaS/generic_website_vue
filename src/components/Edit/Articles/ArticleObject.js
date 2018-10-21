import axios from "../../../http";
import tools from "../../../utils/tools";
import urls from "../../../urls";
import CategoriesStore from "./CategoriesStore";
import GalleriesStore from "../Galleries/GalleriesStore";
import { Dialog } from "buefy";

const headers = { headers: { "content-type": "multipart/form-data" } };

class Article {
  constructor(article, category) {
    this.type = "article";
    this.url = urls.articles + article.id + "/";
    this.id = article.id;
    this.name = article.name;
    this.price = article.price;
    this.description = article.description;
    this.position = article.position;
    this.category = category;
    this.imageId = article.image;
    this.backup = {};
  }
  get image() {
    return GalleriesStore.getImage("Articles", this.imageId);
  }
  set image(value) {
    this.imageId = value;
  }

  get relatedImage() {
    return GalleriesStore.getImage("Articles", this.image.id);
  }
  get edit() {
    return CategoriesSstore;
  }

  setBackup() {
    this.backup.name = this.name;
    this.backup.price = this.price;
    this.backup.description = this.description;
  }

  restore() {
    this.name = this.backup.name;
    this.price = this.backup.price;
    this.description = this.backup.description;
  }

  patch(message = true) {
    if (this.edit.state.editItem && message) this.edit.setLoading();
    axios
      .patch(`articles/${this.id}/`, this.getForm(), headers)
      .then(() => {
        if (this.edit.state.editItem && message) {
          setTimeout(() => {
            tools.message("updated");
            this.edit.unsetLoading();
          }, 1500);
        }
      })
      .catch(() => {
        tools.message("error");
      });
  }

  getForm() {
    let formData = new FormData();
    formData.append("id", this.id);
    formData.append("name", this.name);
    formData.append("price", this.price);
    formData.append("position", this.position);
    formData.append("category", this.category.name);
    formData.append("description", this.description);
    return formData;
  }

  delete(notification = true) {
    if (notification) {
      this.deleteNotification();
    } else {
      this.deleteArticle(false);
    }
  }
  deleteNotification() {
    Dialog.confirm({
      message: "Operation définitive!",
      confirmText: "Supprimer l'article",
      cancelText: "Annuler",
      type: "is-danger",
      hasIcon: true,
      onConfirm: () => {
        this.deleteArticle();
      }
    });
  }
  deleteArticle(message = true) {
    axios.delete(this.url);
    this.category.removeArticle(this);
    this.relatedImage.delete(false);
    if (message) tools.message("imageDel");
  }
}

export { Article };
