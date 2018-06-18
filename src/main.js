// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import 'bulma/css/bulma.css'
import '../static/fonts/font-awesome/css/fontawesome-all.css'
// import '../static/fonts/DancingScript/DancingScript-Bold.ttf'

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
