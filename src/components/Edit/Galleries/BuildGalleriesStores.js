import axios from "axios";
import tools from '../../../utiles/tools';
import {Dialog} from 'buefy';

axios.defaults.baseURL = 'http://localhost:8000/';
let imageUrl = id => `http://localhost:8000/images/${id}/`;
const headers = {headers: {'content-type': 'multipart/form-data'}};

class Image {
  constructor(image, gallery) {
    this.id = image.id;
    this.name = image.name;
    this.position = image.position;
    this.gallery = image.gallery;
    this.description = image.description;
    this.image = image.image;
    this.url = imageUrl(image.id);
    this.parentGallery = gallery;
  }
  getForm() {
    let formData = new FormData();
    formData.append('id', this.id);
    formData.append('position', this.position);
    formData.append('gallery', this.gallery);
    formData.append('description', this.description);
    return formData;
  }
  deleteNotification() {
    Dialog.confirm({
      message: 'Operation définitive!',
      confirmText: "Effacer l'image",
      cancelText: 'Annuler',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        axios.delete(this.url);
        tools.message('imageDel');
        this.parentGallery.removeImage(this);
      },
    });
  }
  delete() {
    this.deleteNotification();
  }
  patch() {
    axios.patch(this.url, this.getForm(), headers);
  }
}

class Gallery {
  constructor(gallery) {
    this.id = gallery.id;
    this.name = gallery.name;
    this.limit = gallery.limit;
    this.url = `galleries/${gallery.name}`;
    this.isLocked = false;
    this.images = [];
    this.initImages(gallery.images);
    this.sortByPosition();
  }
  isFull() {
    return this.count >= this.limit;
  }
  lock() {
    this.isLocked = true;
  }
  unlock() {
    this.isLocked = false;
  }

  get count() {
    return this.images.length;
  };

  sortByPosition() {
    this.images.sort((a, b) => {return a.position - b.position;});
  }
  update() {
    if (!this.count) return;
    this.updateImagePositionField();
    this.updateImageGalleryField();
    this.updateImages();
  }
  updateImagePositionField() {
    for (let i = 0; i < this.count; i++)
      this.images[i].position = i + 1;
  }
  updateImageGalleryField() {
    this.images.forEach(i => {i.gallery = this.name;});
  }
  updateImages() {
    this.images.forEach(i => {i.patch();});
  }
  postImage(form) {
    axios.post('images/', form, headers).then(response => {
      this.initImages([response.data]);
    });
  }
  initImages(images) {
    images.forEach(i => {this.images.push(new Image(i, this));});
  }
  removeImage(image) {
    this.images.splice(this.images.indexOf(image), 1);
  }
}

export {Gallery};
