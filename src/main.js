

import Vue from 'vue';
import Buefy from 'buefy';
import Vuex from 'vuex';
import VueRouter from 'vue-router';


import VueScrollTo from 'vue-scrollto';
import VueScrollReveal from 'vue-scroll-reveal';
import VeeValidate from 'vee-validate';


import '../static/js/velocity';
import '../static/fonts/font-awesome/css/fontawesome-all.css';
import 'vue2-animate/dist/vue2-animate.min.css';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueScrollTo);
Vue.use(VueScrollReveal);
Vue.use(VeeValidate);
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultTooltipAnimated: true,
});


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


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(require('./App').default),
});

