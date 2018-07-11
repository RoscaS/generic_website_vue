import Vuex from 'vuex';

const state = {
  edit: false,
};

const getters = {
  editNav: state => state.edit,
};

const mutations = {
  TOGGLE_EDIT: (state) => { state.edit = !state.edit },
};

const actions = {
  toggleEdit: (store) => { store.commit('TOGGLE_EDIT'); },
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  actions,
});

