import axios from 'axios';
import urls from './static';

class PromoStore {
  constructor() {
    this.url = urls.promo;
    this.state = {
      title: '',
      text: '',
      image: '',
    };
    this.get();
  }

  get() {
    axios.get(this.url).then(resp => {
      this.state.title = resp.data.title;
      this.state.text = resp.data.text;
      this.state.image = resp.data.image.image;
    }).catch(error => {
      console.log(this.url);
      console.log(error);
    });
  }

  patch() {
    axios.patch(this.url, {
      title: this.state.title,
      text: this.state.text,
      image: this.state.image,
    }).then(response => {
      this.isLoading = false;
      this.toast(messages.success.message, messages.success.type);
      this.clearForm();
    }).catch(error => {
      this.isLoading = false;
      this.toast(messages.errorBack.message, messages.errorBack.type);
      console.log(this.url);
      console.log(error);
    });


  }
}


export default new PromoStore()
