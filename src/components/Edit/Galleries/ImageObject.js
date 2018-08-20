import axios from "axios";
import tools from '../../../utiles/tools';
import {Dialog} from 'buefy';

axios.defaults.baseURL = 'http://localhost:8000/';
const headers = {headers: {'content-type': 'multipart/form-data'}};
let imageUrl = id => `${axios.defaults.baseURL}images/${id}/`;


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

export {Image}