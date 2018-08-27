// Vendor
import Buefy from 'buefy';
import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import VueScrollTo from 'vue-scrollto';
import VueScrollReveal from 'vue-scroll-reveal';
import VeeValidate from 'vee-validate';
// import Sticky from 'vue-sticky-directive'


require('vuetify/src/stylus/app.styl');
import VApp from 'vuetify/es5/components/VApp';
import Vuetify from 'vuetify/es5/components/Vuetify';
import VTabs from 'vuetify/es5/components/VTabs';
import VCard from 'vuetify/es5/components/VCard';
import VForm from 'vuetify/es5/components/VForm';
import VTextarea from 'vuetify/es5/components/VTextarea';
import VTextField from 'vuetify/es5/components/VTextField';
import VSelect from 'vuetify/es5/components/VSelect';
import VCheckbox from 'vuetify/es5/components/VCheckbox';
import VSwitch from 'vuetify/es5/components/VSwitch';


// import VGrid from 'vuetify/es5/components/VGrid';

Vue.use(Vuetify, {
	components: {
		VApp,
		VTabs,
		VCard,
    VForm,
    VTextarea,
    VTextField,
    VSelect,
    VCheckbox,
    VSwitch,
		// VGrid,
	}
});



import '../static/js/velocity';
import '../static/fonts/font-awesome/css/fontawesome-all.css';
// import 'vue2-animate/dist/vue2-animate.min.css';

// Vue.use(Sticky);
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
import Tools from './utiles/tools';
import SiteSettings from './utiles/siteSettings';

const Global = {
  SiteSettings: SiteSettings,
  Tools: Tools
};

Global.install = function() {
  Object.defineProperty(Vue.prototype, '$Global', {
    get() { return Global; }
  });
};

Vue.use(Global);


  //  Global components
import Title from './components/Title';
import InOut from './components/InOut';

Vue.component('Title', Title);
Vue.component('InOut', InOut);



// Router
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'public',
      component: require('./routes/Public.vue').default,
    },

    {
      path: '/login',
      mane: 'login',
      component: require('./components/Login/Login').default,
    },
  ]
});


axios.defaults.baseURL = 'http://localhost:8000/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;


Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(require('./App').default),
});

