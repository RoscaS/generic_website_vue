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

const url = 'presentation/1/';

const state = {
  title: '',
  subTitle: '',
  text1: '',
  text2: '',
  image: '',

  backup: {
    title: '',
    subTitle: '',
    text1: '',
    text2: '',
    image: '',
  },

  isDirty: false,
  isLoading: false,
};

const getters = {
  presTitle: state => state.title,
  presSubTitle: state => state.subTitle,
  presText1: state => state.text1,
  presText2: state => state.text2,
  presImage: state => state.image,
  presBackupData: state => state.backup,
  DirtyFlag: state => state.isDirty,
  LoadingFlag: state => state.isLoading,
};

const mutations = {
  SET_TITLE: (state, title) => { state.title = title; },
  SET_SUBTITLE: (state, subTitle) => { state.subTitle = subTitle; },
  SET_TEXT1: (state, text1) => { state.text1 = text1; },
  SET_TEXT2: (state, text2) => { state.text2 = text2; },
  SET_IMAGE: (state, image) => { state.image = image; },

  SET_BACKUP: state => {
    state.backup.title = state.title;
    state.backup.subTitle = state.subTitle;
    state.backup.text1 = state.text1;
    state.backup.text2 = state.text2;
    state.backup.image = state.image;
  },

  SET_RECOVER: state => {
    state.title = state.backup.title;
    state.subTitle = state.backup.subTitle;
    state.text1 = state.backup.text1;
    state.text2 = state.backup.text2;
    state.image = state.backup.image;
  },

  CLEAR_BACKUP: state => {
    state.backup.title = '';
    state.backup.subTitle = '';
    state.backup.text1 = '';
    state.backup.text2 = '';
    state.backup.image = '';
  },

  TOGGLE_DIRTY: state => { state.isDirty = !state.isDirty; },

  TOGGLE_LOADING: state => { state.isLoading = !state.isLoading; },
};

const actions = {
  fetchData: store => {
    axios.get(url).then(response => {
      store.commit('SET_TITLE', response.data.title);
      store.commit('SET_SUBTITLE', response.data.sub_title);
      store.commit('SET_TEXT1', response.data.text1);
      store.commit('SET_TEXT2', response.data.text2);
      store.commit('SET_IMAGE', response.data.image.image);
    }).catch(error => { console.log(`${url}\n${error}`) })
  },

  pushData: store => {
    store.commit('TOGGLE_LOADING');
    axios.put(url, {
      title: store.getters.title,
      sub_title: store.getters.subTitle,
      text1: store.getters.text1,
      text2: store.getters.text2,
      image: store.getters.image,
    }).then(response => {

      setTimeout(() => {
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
    })
  },

  setTitle: (store, title) => { store.commit('SET_TITLE', title); },
  setSubTitle: (store, subTitle) => { store.commit('SET_SUBTITLE', subTitle); },
  setText1: (store, text) => { store.commit('SET_TEXT1', text); },
  setText2: (store, text) => { store.commit('SET_TEXT2', text); },
  setImage: (store, image) => { store.commit('SET_IMAGE', image); },

  backupData: store => { store.commit('SET_BACKUP');},
  recoverData: store => {
    store.commit('SET_RECOVER');
    store.commit('CLEAR_BACKUP');
    store.commit('TOGGLE_DIRTY');
    toast('Modifications annulées', 2);
  },

  toggleDirty: store => {
    if (!store.getters.DirtyFlag) {
      let backup = store.getters.presBackupData;
      let fresh = store.getters;

      let titles = backup.title !== fresh.presTitle && backup.title !== '';
      let subTitles = backup.subTitle !== fresh.presSubTitle && backup.subTitle !== '';
      let texts1 = backup.text1 !== fresh.presText1 && backup.text1 !== '';
      let texts2 = backup.text2 !== fresh.presText2 && backup.text2 !== '';
      let images = backup.image !== fresh.presImage && backup.image !== '';


      if (titles || subTitles || texts1 || texts2 || images) {
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
