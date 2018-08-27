import '../static/js/velocity';
import '../static/fonts/font-awesome/css/fontawesome-all.css';

import Buefy from 'buefy';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueScrollTo from 'vue-scrollto';
import VueScrollReveal from 'vue-scroll-reveal';
import VeeValidate from 'vee-validate';

require('vuetify/src/stylus/app.styl');
import Vuetify from 'vuetify/es5/components/Vuetify';
import VApp from 'vuetify/es5/components/VApp';
import VTabs from 'vuetify/es5/components/VTabs';
import VCard from 'vuetify/es5/components/VCard';
import VForm from 'vuetify/es5/components/VForm';
import VTextarea from 'vuetify/es5/components/VTextarea';
import VTextField from 'vuetify/es5/components/VTextField';
import VCheckbox from 'vuetify/es5/components/VCheckbox';
import VSwitch from 'vuetify/es5/components/VSwitch';

Vue.use(Vuetify, {
  iconfont: 'fa',
	components: {
		VApp,
		VTabs,
		VCard,
    VForm,
    VTextarea,
    VTextField,
    VCheckbox,
    VSwitch,
	}
});
Vue.use(VueRouter);
Vue.use(VueScrollTo);
Vue.use(VueScrollReveal);
Vue.use(VeeValidate);
Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultTooltipAnimated: true,
});

import router from './routes/Routes'
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: h => h(require('./App').default),
});

