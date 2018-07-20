import Vuex from 'vuex';
import axios from 'axios';
import {Toast} from 'buefy';

function toast(message, type) {
  let success = ['is-danger', 'is-success', 'is-warning'];
  Toast.open({
    message: message,
    type: success[type],
    position: 'is-bottom'
  });
}

const url = 'promo/1/';


const state = {
  title: '',
  text: '',
  image: '',

  backup: {
    title: '',
    text: '',
    image: '',
  },

  isDirty: false,
  isLoading: false,
};

const getters = {
  promoTitle: state => state.title,
  promoText: state => state.text,
  promoImage: state => state.image,
  promoBackupData: state => state.backup,
  DirtyFlag: state => state.isDirty,
  LoadingFlag: state => state.isLoading,
};

const mutations = {
  SET_TITLE: (state, title) => { state.title = title; },
  SET_TEXT: (state, text) => { state.text = text; },
  SET_IMAGE: (state, image) => { state.image = image; },

  SET_BACKUP: state => {
    state.backup.title = state.title;
    state.backup.text = state.text;
    state.backup.image = state.image;
  },

  SET_RECOVER: state => {
    state.title = state.backup.title;
    state.text = state.backup.text;
    state.image = state.backup.image;
  },

  CLEAR_BACKUP: state => {
    state.backup.title = '';
    state.backup.text = '';
    state.backup.image = '';
  },

  TOGGLE_DIRTY: state => { state.isDirty = !state.isDirty; },

  TOGGLE_LOADING: state => { state.isLoading = !state.isLoading; },
};


const actions = {
  fetchData: store => {
    axios.get(url).then(response => {
      store.commit('SET_TITLE', response.data.title);
      store.commit('SET_TEXT', response.data.text);
      store.commit('SET_IMAGE', response.data.image.image);
    }).catch(error => { console.log(`${url}\n${error}`) })
  },

  pushData: store => {
    store.commit('TOGGLE_LOADING');
    axios.put(url, {
      title: store.getters.promoTitle,
      text: store.getters.promoText,
      image: store.getters.promoImage,
    }).then(response => {

      setTimeout(()=> {
        toast('Donnée mise à jour!', 1);
        store.commit('CLEAR_BACKUP');
        store.commit('TOGGLE_DIRTY');
        store.commit('TOGGLE_LOADING');
      }, 5000);

      // toast('Donnée mise à jour!', 1);
      // store.commit('CLEAR_BACKUP');
      // store.commit('TOGGLE_DIRTY');
      // store.commit('TOGGLE_LOADING');
    }).catch(error => {
      console.log(`${url}\n${error}`);
      toast("Une erreur est survenue, un mail automatique vient d'être envoyé à l'administrateur.", 0);
      store.commit('SET_RECOVER');
      store.commit('CLEAR_BACKUP');
      store.commit('TOGGLE_DIRTY');
      store.commit('TOGGLE_LOADING');
    });
  },

  setTitle: (store, title) => { store.commit('SET_TITLE', title); },
  setText: (store, text) => { store.commit('SET_TEXT', text); },
  setImage: (store, image) => { store.commit('SET_IMAGE', image)},

  backupData: store => { store.commit('SET_BACKUP');},
  recoverData: store => {
    store.commit('SET_RECOVER');
    store.commit('CLEAR_BACKUP');
    store.commit('TOGGLE_DIRTY');
    toast('Modifications annulées', 2);
  },


  toggleDirty: store => {
    if (!store.getters.DirtyFlag) {
      let backup = store.getters.promoBackupData;
      let fresh = store.getters;
      let titles = backup.title !== fresh.promoTitle && backup.title !== '';
      let texts = backup.text !== fresh.promoText && backup.text !== '';
      let images = backup.image !== fresh.promoImage && backup.image !== '';

      if (titles || texts || images) {
        store.commit('TOGGLE_DIRTY');
      }
    }
  },
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  actions,
});
