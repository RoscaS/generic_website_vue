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

const url = 'gallery/1';

const state = {
  title: '',
  subTitle: '',

  backup: {
    title: '',
    subTitle: '',
  },

  isDirty: false,
  isLoading: false,
};

const getters = {
  galTitle: state => state.title,
  galSubTitle: state => state.subTitle,
  galBackupData: state => state.backup,
  DirtyFlag: state => state.isDirty,
  LoadingFlag: state => state.isLoading,
};

const mutations = {
  SET_TITLE: (state, title) => { state.title = title; },
  SET_SUBTITLE: (state, subTitle) => { state.subTitle = subTitle; },

  SET_BACKUP: state => {
    state.backup.title = state.title;
    state.backup.subTitle = state.subTitle;
  },

  SET_RECOVER: state => {
    state.title = state.backup.title;
    state.subTitle = state.backup.subTitle;
  },

  CLEAR_BACKUP: state => {
    state.backup.title = '';
    state.backup.subTitle = '';
  },

  TOGGLE_DIRTY: state => { state.isDirty = !state.isDirty; },

  TOGGLE_LOADING: state => { state.isLoading = !state.isLoading; },
};

const actions = {
  fetchData: store => {
    axios.get(url).then(response => {
      store.commit('SET_TITLE', response.data.title);
      store.commit('SET_SUBTITLE', response.data.sub_title);
    }).catch(error => { console.log(`${url}\n${error}`) })
  },

  pushData: store => {
    store.commit('TOGGLE_LOADING');
    axios.put(url, {
      title: store.getters.title,
      sub_title: store.getters.subTitle,
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

  backupData: store => { store.commit('SET_BACKUP');},
  recoverData: store => {
    store.commit('SET_RECOVER');
    store.commit('CLEAR_BACKUP');
    store.commit('TOGGLE_DIRTY');
    toast('Modifications annulées', 2);
  },

  toggleDirty: store => {
    if (!store.getters.DirtyFlag) {
      let backup = store.getters.galBackupData;
      let fresh = store.getters;

      let titles = backup.title !== fresh.galTitle && backup.title !== '';
      let subTitles = backup.subTitle !== fresh.galSubTitle && backup.subTitle !== '';

      if (titles || subTitles) {
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
