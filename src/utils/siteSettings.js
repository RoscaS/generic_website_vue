import Vue from 'vue';
import axios from 'axios';
import tools from './tools';


const SiteOptions = new Vue({
  data: {
    url: 'http://localhost:8000/options',
    data: '',
    projectName: '',
    name: '',
    nameAdd: '',
    description: '',
    oppening: '',
    adress: '',
    city: '',
    postCode: '',
    phone: '',
    mail: '',
    facebook: '',
    tripadvisor: '',
    google: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    snapchat: '',
  },
  created() {
    axios.get(this.url).then(response => {
      let data = response.data[0];
      this.url = 'http://localhost:8000/options';
      this.projectName = data.project_name;
      this.name = data.name;
      this.nameAdd = data.name_add;
      this.description = data.description;
      this.oppening = data.oppening;
      this.adress = data.adress;
      this.city = data.city;
      this.postCode = data.post_code;
      this.phone = data.phone;
      this.mail = data.mail;
      this.facebook = data.facebook;
      this.tripadvisor = data.tripadvisor;
      this.google = data.google;
      this.twitter = data.twitter;
      this.instagram = data.instagram;
      this.linkedin = data.linkedin;
      this.snapchat = data.snapchat;
    }).catch(error => {
        tools.message('error', error, this.url);
    });
  }
});

export default SiteOptions;
