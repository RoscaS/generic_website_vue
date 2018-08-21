import axios from "axios";
import tools from '../../../utiles/tools';
import {Image} from './ImageObject'

axios.defaults.baseURL = 'http://localhost:8000/';
const headers = {headers: {'content-type': 'multipart/form-data'}};

class Gallery {
  constructor(name) {
    this.id = null;
    this.name = name;
    this.limit = null;
    this.dirty = [];
    this.images = [];
    this.isEmpty = false;
    this.isLocked = false;
    this.hasLoaded = false;
    this.placeholder = null;
    this.url = `galleries/${this.name}`;
    this.initData();
  }

  count() { return this.images.length;};
  isFull() { return this.count() >= this.limit; }
  lock() {this.isLocked = true;}
  unlock() {this.isLocked = false;}

  getImage(idx) {
    if (this.hasLoaded) return this.images[idx];
    else return setTimeout(() => {this.getImage(idx)}, 500);
  }

  initData() {
    axios.get(this.url).then(response => {
      this.id = response.data.id;
      this.limit = response.data.limit;
      this.initImages(response.data.images);
    })
  }
  initImages(images) {
    images.forEach(i => {
      let image = new Image(i, this);
      this.images.push(image);
      if (images.length == 1 && images[0].name.includes('placeholder')) {
        this.isEmpty = true;
        this.placeholder = image;
      }
    });
    this.sortByPosition();
    this.update();
    this.hasLoaded = true;
  }
  sortByPosition() {
    this.images.sort((a, b) => {return a.position - b.position;});
  }
  setDirty(image) {
    if (!this.dirty.includes(image)) this.dirty.push(image);
  }
  update(message=true) {
    if (!this.count() && !this.isEmpty) this.setPlaceHolder();
    if (this.count() == 2 && this.isEmpty) this.unsetPlaceholder();
    this.checkFields(message);
    if (this.dirty.length) this.updateDirtyImages();
  }
  checkFields() {
    for (let i = 0; i < this.count(); i++) {
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
    console.log(this.dirty);
    this.dirty.forEach(i => {i.patch();});
    this.dirty.splice(0, this.dirty.length)
    if (message) tools.message('imageMoved');
  }
  postImage(form) {
    axios.post('images/', form, headers).then(response => {
      this.initImages([response.data]);
    });
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

export {Gallery};
