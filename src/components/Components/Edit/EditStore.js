import Vuex from 'vuex';

const state = {
  edit: false,
};

const getters = {
  editNav: state => state.edit,
};

const mutations = {
  EDIT_ON: state => { state.edit = true; },
  EDIT_OFF: state => { state.edit = false; },
  EDIT_TOGGLE: state => { state.edit = !state.edit; },
};

const actions = {
  editToggle: store => { store.commit('EDIT_TOGGLE'); },
  editOn: store => { store.commit('EDIT_ON'); },
  editOff: store => { store.commit('EDIT_OFF'); },
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  actions,
});

