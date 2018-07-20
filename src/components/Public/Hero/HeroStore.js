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

function checkEmpty(backup, fresh) {
  console.log('in checkEmpty')
  for (let i in backup) {
    console.log(`${i}\nbackup: ${backup[i]}\nfresh: ${fresh[i]}`);
    if (backup[i] !== fresh[i] && backup[i] !== '') {
      return false
    }
  }
  return true
}

const url = 'hero/1/';

const state = {
  left: {icon: '', title: '', text: ''},
  middle: {icon: '', title: '', text: ''},
  right: {icon: '', title: '', text: ''},

  backup: {
    left: {icon: '', title: '', text: ''},
    middle: {icon: '', title: '', text: ''},
    right: {icon: '', title: '', text: ''},
  },

  isDirty: false,
  isLoading: false,
};

const getters = {
  heroLeft: state => state.left,
  heroMiddle: state => state.middle,
  heroRight: state => state.right,
  heroBackupData: state => state.backup,
  DirtyFlag: state => state.isDirty,
  LoadingFlag: state => state.isLoading,
};

const mutations = {
  SET_LEFT_TITLE: (state, title) => { state.left.title = title; },
  SET_MIDDLE_TITLE: (state, title) => { state.middle.title = title; },
  SET_RIGHT_TITLE: (state, title) => { state.right.title = title; },

  SET_LEFT_ICON: (state, icon) => { state.left.icon = icon; },
  SET_MIDDLE_ICON: (state, icon) => { state.middle.icon = icon; },
  SET_RIGHT_ICON: (state, icon) => { state.right.icon = icon; },

  SET_LEFT_TEXT: (state, text) => { state.left.text = text; },
  SET_MIDDLE_TEXT: (state, text) => { state.middle.text = text; },
  SET_RIGHT_TEXT: (state, text) => { state.right.text = text; },


  SET_BACKUP: state => {
    state.backup.left.title = state.left.title;
    state.backup.middle.title = state.middle.title;
    state.backup.right.title = state.right.title;

    state.backup.left.icon = state.left.icon;
    state.backup.middle.icon = state.middle.icon;
    state.backup.right.icon = state.right.icon;

    state.backup.left.text = state.left.text;
    state.backup.middle.text = state.middle.text;
    state.backup.right.text = state.right.text;
  },

  SET_RECOVER: state => {
    state.left.title = state.backup.left.title;
    state.middle.title = state.backup.middle.title;
    state.right.title = state.backup.right.title;

    state.left.icon = state.backup.left.icon;
    state.middle.icon = state.backup.middle.icon;
    state.right.icon = state.backup.right.icon;

    state.left.text = state.backup.left.text;
    state.middle.text = state.backup.middle.text;
    state.right.text = state.backup.right.text;
  },

  CLEAR_BACKUP: state => {
    state.backup.left.title = '';
    state.backup.middle.title = '';
    state.backup.right.title = '';

    state.backup.left.icon = '';
    state.backup.middle.icon = '';
    state.backup.right.icon = '';

    state.backup.left.text = '';
    state.backup.middle.text = '';
    state.backup.right.text = '';
  },

  TOGGLE_DIRTY: state => { state.isDirty = !state.isDirty; },

  TOGGLE_LOADING: state => { state.isLoading = !state.isLoading; },
};

const actions = {
  fetchData: store => {
    axios.get(url).then(response => {
      store.commit('SET_LEFT_TITLE', response.data.title1);
      store.commit('SET_MIDDLE_TITLE', response.data.title2);
      store.commit('SET_RIGHT_TITLE', response.data.title3);

      store.commit('SET_LEFT_ICON', response.data.icon1);
      store.commit('SET_MIDDLE_ICON', response.data.icon2);
      store.commit('SET_RIGHT_ICON', response.data.icon3);

      store.commit('SET_LEFT_TEXT', response.data.text1);
      store.commit('SET_MIDDLE_TEXT', response.data.text2);
      store.commit('SET_RIGHT_TEXT', response.data.text3);
    }).catch(error => { console.log(`${url}\n${error}`); });
  },

  pushData: store => {
    store.commit('TOGGLE_LOADING');
    axios.put(url, {
      title1: store.getters.heroLeft.title,
      title2: store.getters.heroMiddle.title,
      title3: store.getters.heroRight.title,

      icon1: store.getters.heroLeft.icon,
      icon2: store.getters.heroMiddle.icon,
      icon3: store.getters.heroRight.icon,

      text1: store.getters.heroLeft.text,
      text2: store.getters.heroMiddle.text,
      text3: store.getters.heroRight.text,
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
    });
  },


  setLeftTitle: (store, title) => { store.commit('SET_LEFT_TITLE', title); },
  setMiddleTitle: (store, title) => { store.commit('SET_MIDDLE_TITLE', title); },
  setRightTitle: (store, title) => { store.commit('SET_RIGHT_TITLE', title); },

  setLeftIcon: (store, icon) => { store.commit('SET_LEFT_ICON', icon); },
  setMiddleIcon: (store, icon) => { store.commit('SET_MIDDLE_ICON', icon); },
  setRightIcon: (store, icon) => { store.commit('SET_RIGHT_ICON', icon); },

  setLeftText: (store, text) => { store.commit('SET_LEFT_TEXT', text); },
  setMiddleText: (store, text) => { store.commit('SET_MIDDLE_TEXT', text); },
  setRightText: (store, text) => { store.commit('SET_RIGHT_TEXT', text); },


  backupData: store => { store.commit('SET_BACKUP');},
  recoverData: store => {
    store.commit('SET_RECOVER');
    store.commit('CLEAR_BACKUP');
    store.commit('TOGGLE_DIRTY');
    toast('Modifications annulées', 2);
  },

  toggleDirty: store => {
    if (!store.getters.DirtyFlag) {
      let backup = store.getters.heroBackupData;

      let lefts = checkEmpty(backup.left, store.getters.heroLeft);
      let middles = checkEmpty(backup.middle, store.getters.heroMiddle);
      let rights = checkEmpty(backup.right, store.getters.heroRight);

      if (lefts || middles || rights) {
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
