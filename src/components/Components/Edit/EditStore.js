import Vue from 'vue';

const EditStore = new Vue({
  data: {
    component: null,
    loading: false,
    active: false,
    dirty: false,

    pushSignal: false,
    backupSignal: false,
    recoverSignal: false,

    image: '',

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
    sendBackupSignal() {
      this.backupSignal = true;
      setTimeout(() => { this.backupSignal = false }, 10);
    },
    sendRecoverSignal() {
      this.recoverSignal = true;
      setTimeout(() => { this.recoverSignal = false }, 10);
    },

    start(component) {
      this.component = component;
      this.sendBackupSignal();
      this.active = true;
    },
    end() {
      this.loading = false;
      this.active = false;
      setTimeout(() => { this.component = null; }, 1000);
    },
  },
});

export default EditStore;

