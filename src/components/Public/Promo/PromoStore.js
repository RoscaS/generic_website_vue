import Vuex from 'vuex';
import axios from 'axios';


const url = 'http://localhost:8000/promo/1/';
const instance = axios.create({baseURL: url});

// instance.defaults.headers.common['Authorisation'] = AUTH_TOKEN;


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
    instance
    .get().then(response => {
      store.commit('SET_TITLE', response.data.title);
      store.commit('SET_TEXT', response.data.text);
      store.commit('SET_IMAGE', response.data.image.image)
    }).catch(error => {console.log(url+'\n'+error);})
  },

  pushData: (store) => {
    axios.put(url, {
      title: this.promoTitle,
      text:  this.promoText,
      image: this.promoImage,
    }).then(response => {
      console.log(this.promoTitle);
      console.log(this.promoText);
      console.log(this.promoImage);
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
