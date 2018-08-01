import Vue from 'vue';
import axios from 'axios';


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
      this.data = response.data[0];
      this.url = 'http://localhost:8000/options';
      this.projectName = this.data.project_name;
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
});

export default SiteOptions;
