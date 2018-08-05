import Vue from 'vue';
import {Toast} from 'buefy';


const types = [
  {color: 'is-danger', message: "Une erreur est survenue, un mail automatique vient d'être envoyé à l'administrateur." },
  {color: 'is-success', message: "Donnée mise à jour!"},
  {color: 'is-warning', message: "Modifications annulées."},
];


const Tools = new Vue({
  methods: {
    message(type) { this.toast(type); },
    errorMessage(url, error) { this.toast(0, url, error); },

    toast(type, url = '', error = null) {
      if (error) {console.log(`Error @ ${url} call:\n${error}`);}
      Toast.open({
        message: types[type].message,
        type: types[type].color,
        position: 'is-bottom'
      });
    },


    SnackBarOptions() {
      this.message = `Les modifications seront perdues 
        (Pressez le bouton vert pour sauver).`;
      this.type = 'is-warning';
      this.position = 'is-top';
      this.actionText = 'Continuer?';
      this.duration = 5000;
      this.indefinite = false;
      // this.onAction = onAction();
    },

    ScrollRevealOptions(side, delay, distance = 100, duration = 1500) {
      this.origin = side;
      this.distance = `${distance}px`;
      this.duration = duration;
      this.delay = delay;
      this.easing = 'ease';
    },
  }
});

export default Tools;

