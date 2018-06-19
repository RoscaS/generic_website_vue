// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueScrollTo from 'vue-scrollto'
// import VueSlideUpDown from'vue-slide-up-down'

import '../static/js/velocity'
import '../static/fonts/font-awesome/css/fontawesome-all.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'bulma/css/bulma.css'

Vue.use(VueScrollTo);








Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});



// Vue.component('vue-slide-up-down');
