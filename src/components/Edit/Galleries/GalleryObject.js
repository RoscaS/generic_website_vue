import axios from "../../../http";
import tools from "../../../utils/tools";
import urls from "../../../urls";
import { Image } from "./ImageObject";
import GalleriesStore from "./GalleriesStore";

const headers = { headers: { "content-type": "multipart/form-data" } };

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
    this.url = urls.galleries + this.name;
    this.initData();
  }

  count() {
    return this.images.length;
  }
  isFull() {
    return this.count() >= this.limit;
  }
  lock() {
    this.isLocked = true;
  }
  unlock() {
    this.isLocked = false;
  }
  imageAtIndex(idx) {
    if (this.hasLoaded) return this.images[idx];
    else
      return setTimeout(() => {
        this.imageAtIndex(idx);
      }, 500);
  }

  initData() {
    axios.get(this.url).then(response => {
      this.id = response.data.id;
      this.limit = response.data.limit;
      this.initImages(response.data.images);
    });
  }

  initImages(images) {
    images.forEach(i => {
      let image = new Image(i, this);
      this.images.push(image);
      if (images.length === 1 && images[0].name.includes("placeholder")) {
        this.isEmpty = true;
        this.placeholder = image;
      }
    });
    this.sortByPosition();
    // this.update();        // TEST AUTH
    this.hasLoaded = true;
  }

  sortByPosition() {
    this.images.sort((a, b) => {
      return a.position - b.position;
    });
  }

  setDirty(image) {
    if (!this.dirty.includes(image)) this.dirty.push(image);
  }

  update(message = true) {
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
    this.dirty.forEach(i => {
      i.patch();
    });
    this.dirty.splice(0, this.dirty.length);
    if (message) tools.message("imageMoved");
  }

  toggleLoading(message) {
    GalleriesStore.setLoading();
    setTimeout(() => {
      GalleriesStore.unsetLoading();
      setTimeout(() => {
        GalleriesStore.activeTab = 0;
      }, 500);
      message ? tools.message("imageUp") : null;
    }, 2000);
  }

  postImage(form, message = true) {
    this.toggleLoading(message);
    axios
      .post("images/", form, headers)
      .then(response => {
        this.initImages([response.data]);
      })
      .catch(() => {
        tools.message("Fichier jpg ou png uniquement!");
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
    axios
      .post("galleries/get_placeholder/", { gallery: this.name })
      .then(response => {
        let data = response.data;
        data.image = axios.defaults.baseURL + data.image.slice(1);
        this.isEmpty = true;
        this.initImages([data]);
      });
  }
}

export { Gallery };
