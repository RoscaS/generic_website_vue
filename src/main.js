// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Buefy from 'buefy';

import VueScrollTo from 'vue-scrollto';
import VueScrollReveal from 'vue-scroll-reveal';
import VeeValidate from 'vee-validate';
// import VueTyper from 'vue-typer';
// USE VODAL FOR ADMIN MODAL

import '../static/js/velocity';
import '../static/fonts/font-awesome/css/fontawesome-all.css';
import 'vue2-animate/dist/vue2-animate.min.css';


Vue.use(VueScrollTo);
Vue.use(VueScrollReveal);
Vue.use(VeeValidate);
// Vue.use(VueTyper);


Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultTooltipAnimated: true,
});


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
});

// Vue.component('vue-slide-up-down');
