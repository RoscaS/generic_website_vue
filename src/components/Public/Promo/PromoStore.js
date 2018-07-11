import Vuex from 'vuex';
import axios from 'axios';

const url = 'promo/1/';

const state = {
  title: '',
  text: '',
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

  fetchData: (store) => {
    axios
    .get(url).then(response => {
      store.commit('SET_TITLE', response.data.title);
      store.commit('SET_TEXT', response.data.text);
      store.commit('SET_IMAGE', response.data.image.image)
    }).catch(error => {console.log(url+'\n'+error);})
  },

  pushData: (store) => {
    axios.put(url, {
      title: store.getters.promoTitle,
      text:  store.getters.promoText,
      image: store.getters.promoImage,
    }).then(response => {
      console.log(url+'\n'+response);
    }).catch(error => {console.log(url+'\n'+error);})
  },

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
