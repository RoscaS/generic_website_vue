import axios from "axios";
import tools from '../../../utiles/tools';
import {Dialog} from 'buefy';
import GalleriesStore from "./GalleriesStore";

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

  delete(notification=true) {
    if (notification) {
      this.deleteNotification()
    } else {
      this.deleteImage(false)
    }
  }
  deleteNotification() {
    Dialog.confirm({
      message: 'Operation définitive!',
      confirmText: "Effacer l'image",
      cancelText: 'Annuler',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {this.deleteImage()},
    });
  }
  deleteImage(message=true) {
    axios.delete(this.url);
    this.parentGallery.removeImage(this);
    if (message) tools.message('imageDel');
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
    this.dirty = [];
    this.images = [];
    this.isEmpty = false;
    this.isLocked = false;
    this.hasLoaded = false;
    this.placeholder = null;
    this.initImages(gallery.images);
    this.sortByPosition();
  }
  isFull() { return this.count >= this.limit; }

  lock() {this.isLocked = true;}
  unlock() {this.isLocked = false;}

  get count() {
    return this.images.length;
  };

  setDirty(image) {
    if (!this.dirty.includes(image)) this.dirty.push(image);
  }

  sortByPosition() {
    this.images.sort((a, b) => {return a.position - b.position;});
  }
  update(message=true) {
    if (!this.count && !this.isEmpty) {
      this.setPlaceHolder();
    }
    if (this.count == 2 && this.isEmpty){
      this.unsetPlaceholder();
    }
    this.checkFields(message);
    if (this.dirty.length) {
      this.updateDirtyImages();
    }

  }
  checkFields() {
    for (let i = 0; i < this.count; i++) {
      if (this.images[i].position != i + 1) {
        this.images[i].position = i + 1;
        this.setDirty(this.images[i]);
      }
      if (this.images[i].gallery != this.name) {
        this.images[i].gallery = this.name;
        this.images[i].parentGallery = this;
        this.setDirty(this.images[i]);
      }
    }
  }
  updateDirtyImages(message) {
    this.dirty.forEach(i => {i.patch();});
    this.dirty.splice(0, this.dirty.length)
    if (message) tools.message('imageMoved');
  }
  postImage(form) {
    axios.post('images/', form, headers).then(response => {
      this.initImages([response.data], true);

    });
  }
  initImages(images, update=false) {
    images.forEach(i => {
      let image = new Image(i, this);
      this.images.push(image);
      if (images.length == 1 && images[0].name.includes('placeholder')) {
        this.isEmpty = true;
        this.placeholder = image;
      }
    });
    if (update) this.update();
    this.hasLoaded = true;
  }
  removeImage(image) {
    this.images.splice(this.images.indexOf(image), 1);
    this.update(false);
  }
  setPlaceHolder() {
    this.hasLoaded = false;
    this.getPlaceHolder();
  }
  unsetPlaceholder() {
    this.isEmpty = false;
    this.placeholder.delete(false);
    this.placeholder = null;
  }
  getPlaceHolder() {
    axios.post('galleries/get_placeholder/', {gallery: this.name})
    .then(response => {
      let data = response.data;
      data.image = axios.defaults.baseURL + data.image.slice(1);
      this.isEmpty = true;
      this.initImages([data]);
    });
  }
}

export {Gallery, Image};
