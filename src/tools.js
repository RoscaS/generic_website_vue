import Vue from 'vue';
import {Toast} from 'buefy';

const toastType = ['is-danger', 'is-success', 'is-warning'];

const Tools = new Vue({
  methods: {
    message(message, type) { this.toast(message, type); },

    errorMessage(message, url, error) { this.toast(message, 0, url, error); },

    toast(message, type, url='', error=null) {
      console.log(message)
      if (error) {console.log(`Error @ ${url} call:\n${error}`);}
      Toast.open({
        message: message,
        type: toastType[type],
        position: 'is-bottom'
      });
    },
  }
});

export default Tools;

