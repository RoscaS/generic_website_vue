import Vue from "vue";
import store from "./LightboxStore";

Vue.directive("lightbox", {
  bind(el, binding) {
    let index = store.addImage(el.getAttribute("href"));
    store.addDescription(el.getAttribute("description"));
    el.addEventListener("click", function(e) {
      e.preventDefault();
      store.open(index);
    });
  }
});
