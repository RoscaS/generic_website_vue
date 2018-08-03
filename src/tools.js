import Vue from 'vue';
import {Toast, Snackbar} from 'buefy';

const data = [
  { color: 'is-danger', message: "Une erreur est survenue, un mail automatique vient d'être envoyé à l'administrateur." },
  { color: 'is-success', message: "Donnée mise à jour!" },
  { color: 'is-warning', message: "Modifications annulées." },
];

const Tools = new Vue({
  data() {
    return {
      snackBarData: {

      }
    }
  },
  methods: {
    message(type) { this.toast(type); },
    errorMessage(url, error) { this.toast(0, url, error); },

    toast(type, url='', error=null) {
      if (error) {console.log(`Error @ ${url} call:\n${error}`);}
      Toast.open({
        message: data[type].message,
        type: data[type].color,
        position: 'is-bottom'
      });
    },
  }
});

export default Tools;

