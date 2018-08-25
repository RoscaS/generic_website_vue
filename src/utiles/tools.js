import Vue from 'vue';
import {Toast} from 'buefy';

const message = {
  error: {
    type: 'is-danger',
    position: 'is-bottom',
    message: "Une erreur est survenue, un mail automatique vient d'être envoyé à l'administrateur."
  },
  updated: {
    type: 'is-success',
    position: 'is-bottom',
    message: "Donnée(s) mise(s) à jour!"
  },
  cancel: {
    type: 'is-warning',
    position: 'is-bottom',
    message: "Modifications annulées."
  },

  imageUp: {
    type: 'is-success',
    position: 'is-bottom',
    message: "Image chargée sur le serveur."
  },
  imageDel: {
    type: 'is-success',
    position: 'is-bottom',
    message: "Image supprimée du serveur."
  },
  imageMoved: {
    type: 'is-success',
    position: 'is-bottom',
    message: "Nouvelles positions enregistrées."
  },
  imageErr: {
    type: 'is-danger',
    position: 'is-bottom',
    message: "Une erreur est survenue. jpg ou png uniquement."
  },
  articleDel: {
    type: 'is-success',
    position: 'is-bottom',
    message: "Article supprimée du serveur."
  },
  categoryDel: {
    type: 'is-success',
    position: 'is-bottom',
    message: "Catégorie supprimée du serveur."
  },



  autoScrollOn: {
      type: 'is-success',
      position: 'is-top',
      message: "Défilement automatique activé."
    },
  autoScrollOff: {
      type: 'is-danger',
      position: 'is-top',
      message: "Défilement automatique désactivé."
    },
};

const snackBarMessage = {
  cancel: {type: 'is-warning', message: `Les modifications seront perdues! (bouton vert pour sauver)`},
  delete: {type: 'is-danger', message: `L'image sera définitivement éffacée`}
};



const Tools = new Vue({
  methods: {
    message(type, error = false, url) {
      Toast.open({
        queue: false,
        duration: 3000,
        message: message[type].message,
        type: message[type].type,
        position: message[type].position,
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

