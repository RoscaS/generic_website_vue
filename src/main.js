import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import FontAwesome from "@fortawesome/fontawesome-pro/css/all.min.css";
import VueAnimate from "vue2-animate/dist/vue2-animate.min.css";
import Moment from "moment";
import Affix from "vue-affix";
import ScrollActive from "vue-scrollactive";

import Buefy from "buefy";
import VueRouter from "vue-router";
import VueScrollTo from "vue-scrollto";
import VueScrollReveal from "vue-scroll-reveal";
import VeeValidate from "vee-validate";
import Meta from "vue-meta";

Vue.use(Buefy, {
  defaultIconPack: "fas",
  defaultTooltipAnimated: true
});

Vue.use(VueScrollTo, {
  container: "body",
  duration: 1500,
  easing: "ease",
  offset: 0,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

Vue.use(VueRouter);
Vue.use(VueScrollReveal);
Vue.use(VeeValidate);
Vue.use(Moment);
Vue.use(FontAwesome);
Vue.use(VueAnimate);
Vue.use(Affix);
Vue.use(ScrollActive);
Vue.use(Meta);

Vue.config.productionTip = false;

import auth from "./auth";
Vue.use(auth);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
