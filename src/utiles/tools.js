import Vue from 'vue';
import {Toast} from 'buefy';



const message = {
  error: {type: 'is-danger', message: "Une erreur est survenue, un mail automatique vient d'être envoyé à l'administrateur."},
  updated: {type: 'is-success', message: "Donnée(s) mise(s) à jour!"},
  cancel: {type: 'is-warning', message: "Modifications annulées."},
  imageUp: {type: 'is-success', message: "Image chargée sur le serveur."},
  imageDel: {type: 'is-success', message: "Image supprimée du serveur."},
  imageErr: {type: 'is-danger', message: "Une erreur est survenue. jpg ou png uniquement."},
};

const snackBarMessage = {
  cancel: {type: 'is-warning', message: `Les modifications seront perdues! (bouton vert pour sauver)`},
  delete: {type: 'is-danger', message: `L'image sera définitivement éffacée`}
};



const Tools = new Vue({
  methods: {
    message(type, error = false, url) {
      Toast.open({
        duration: 3000,
        message: message[type].message,
        type: message[type].type,
        position: 'is-bottom',
      });
      if (error) console.log(`error @: ${url}\n${error}`)
    },



    SnackBarOptions(type) {
      this.message = snackBarMessage[type].message;
      this.type = snackBarMessage[type].type;
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

