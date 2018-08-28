import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import FontAwesome from "@fortawesome/fontawesome-pro/css/all.min.css";
import VueAnimate from "vue2-animate/dist/vue2-animate.min.css";
import Moment from "moment";
// import Velocity from "velocity-animate/velocity";
import Affix from "vue-affix";

import Buefy from "buefy";
import VueRouter from "vue-router";
import VueScrollTo from "vue-scrollto";
import VueScrollReveal from "vue-scroll-reveal";
import VeeValidate from "vee-validate";

require("vuetify/src/stylus/app.styl");

import Vuetify from "vuetify/es5/components/Vuetify";
import VApp from "vuetify/es5/components/VApp";
import VTabs from "vuetify/es5/components/VTabs";
import VCard from "vuetify/es5/components/VCard";
import VForm from "vuetify/es5/components/VForm";
import VTextarea from "vuetify/es5/components/VTextarea";
import VTextField from "vuetify/es5/components/VTextField";
import VCheckbox from "vuetify/es5/components/VCheckbox";
import VSwitch from "vuetify/es5/components/VSwitch";

Vue.use(Buefy, {
  defaultIconPack: "fas",
  defaultTooltipAnimated: true
});

Vue.use(Vuetify, {
  iconfont: "fa",
  components: {
    VApp,
    VTabs,
    VCard,
    VForm,
    VTextarea,
    VTextField,
    VCheckbox,
    VSwitch
  }
});
Vue.use(VueRouter);
Vue.use(VueScrollTo);
Vue.use(VueScrollReveal);
Vue.use(VeeValidate);
Vue.use(Moment);
// Vue.use(Velocity);
Vue.use(FontAwesome);
Vue.use(VueAnimate);
Vue.use(Affix);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
