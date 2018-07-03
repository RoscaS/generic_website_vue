import axios from 'axios';

class SiteOptions {
  constructor() {
    this.url = 'http://localhost:8000/options';
    this.data = '';
    this.name = '';
    this.nameAdd = '';
    this.description = '';
    this.oppening = '';
    this.adress = '';
    this.city = '';
    this.postCode = '';
    this.phone = '';
    this.mail = '';
    this.facebook = '';
    this.tripadvisor = '';
    this.google = '';
    this.twitter = '';
    this.instagram = '';
    this.linkedin = '';
    this.snapchat = '';
    this.fetchOptions();
  }

  fetchOptions() {
    axios.get(this.url).then(response => {
      this.data = response.data[0];
      this.url = 'http://localhost:8000/options';
      this.name = this.data.name;
      this.nameAdd = this.data.name_add;
      this.description = this.data.description;
      this.oppening = this.data.oppening;
      this.adress = this.data.adress;
      this.city = this.data.city;
      this.postCode = this.data.post_code;
      this.phone = this.data.phone;
      this.mail = this.data.mail;
      this.facebook = this.data.facebook;
      this.tripadvisor = this.data.tripadvisor;
      this.google = this.data.google;
      this.twitter = this.data.twitter;
      this.instagram = this.data.instagram;
      this.linkedin = this.data.linkedin;
      this.snapchat = this.data.snapchat;
    }).catch(error => {
      console.log(this.url);
      console.log(error);
    });
  }
}

export default new SiteOptions();
