import Vue from 'vue';

const TextsEditStore = new Vue({
  name: 'TextEditStore',
  data: {
    component: null,
    loading: false,
    active: false,
    dirty: false,

    pushSignal: false,
    cancelSignal: false,

    reOrder: false
  },

  methods: {
    setComponent(value) { this.component = value; },
    setLoading(value) { this.loading = value; },
    setDirty(value) { this.dirty = value; },

    sendPushSignal() {
      this.loading = true;
      this.pushSignal = true;
      setTimeout(() => { this.pushSignal = false }, 10);
    },
    sendCancelSignal() {
      this.cancelSignal = true;
      setTimeout(() => { this.cancelSignal = false }, 10);
    },
    start(component) {
      this.component = component;
      this.active = true;
    },
    end() {
      this.loading = false;
      this.active = false;
      setTimeout(() => { this.component = null; }, 1000);
    },
  },
});

export default TextsEditStore;

