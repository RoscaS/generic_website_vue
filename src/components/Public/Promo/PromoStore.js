import Vuex from 'vuex';

const state = {
  title: 'Le titre',
  text: 'Un text',
  image: '',
};

const getters = {
  promoTitle: state => state.title,
  promoText: state => state.text,
  promoImage: state => state.image
};

const mutations = {
  SET_TITLE: (state, title) => { state.title = title; },
  SET_TEXT: (state, text) => { state.text = text; },
  SET_IMAGE: (state, image) => { state.image = image; }
};


const actions = {
  setTitle: (store, title) => { store.commit('SET_TITLE', title); },
  setText: (store, text) => { store.commit('SET_TEXT', text); },
  setImage: (store, image) => { store.commit('SET_IMAGE', image); },
};

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  getters,
  actions,
});
