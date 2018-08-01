// Vendor
import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import VueScrollTo from 'vue-scrollto';
import VueScrollReveal from 'vue-scroll-reveal';
import VeeValidate from 'vee-validate';
import Sticky from 'vue-sticky-directive'

import '../static/js/velocity';
import '../static/fonts/font-awesome/css/fontawesome-all.css';
import 'vue2-animate/dist/vue2-animate.min.css';

Vue.use(Vuex);
Vue.use(Sticky)
Vue.use(VueRouter);
Vue.use(VueScrollTo);
Vue.use(VueScrollReveal);
Vue.use(VeeValidate);
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultTooltipAnimated: true,
});


// Perso
  //  Global variable
import EditPannel from './editPannel';
import Tools from './tools';
import Options from './options';

const Global = {
  EditPannel: EditPannel,
  Options: Options,
  Tools: Tools
};

Global.install = function() {
  Object.defineProperty(Vue.prototype, '$Global', {
    get() { return Global; }
  });
};

Vue.use(Global);


  //  Global components
import Title from './components/Components/Title';
import InOut from './components/Components/InOut';

Vue.component('Title', Title);
Vue.component('InOut', InOut);




// Router
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'public',
      component: require('./components/Public.vue').default,
    },

    {
      path: '/login',
      mane: 'login',
      component: require('./components/Components/Login/Login').default,
    },
  ]
});


axios.defaults.baseURL = 'http://localhost:8000/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


Vue.config.productionTip = false;

import MyMixin from './mixins/PublicMixin'


new Vue({
  el: '#app',
  router,
  render: h => h(require('./App').default),
});

