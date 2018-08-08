import GalleriesEditStore
  from '../../components/Edit/Galleries/GalleriesEditStore';

export default {
  name: 'ImagesComponentMixin',
  data() {
    return {
      edit: GalleriesEditStore,
    };
  },
  computed: {
    pushSignal() { return this.edit.pushSignal; },
    updateSignal() { return this.edit.updateSignal; },
    cancelSignal() { return this.edit.cancelSignal; },
  },
  watch: {
    pushSignal() { if (this.checkSignal(this.pushSignal)) this.pushData(); },
    // pushSignal() { if (this.pushSignal) this.pushData(); },
    updateSignal() { if (this.checkSignal(this.updateSignal)) this.updateData(); },
    // updateSignal() { if (this.updateSignal) this.updateData(); },
    cancelSignal() { if (this.checkSignal(this.cancelSignal)) this.snackBar(); }
  },
  methods: {
    checkComponent() { return this.edit.component === this.component },
    checkSignal(signal) { return signal && this.checkComponent(); },

    setData() {
      if (this.store.fetchFlag) {
        this.state.images = this.store.state.images.slice();
        setTimeout(() => {this.store.dataSet = true;}, 5);
      } else {
        setTimeout(() => { this.setData(); }, 2);
      }
    },
    pushData() {
      this.fetchFlag = false;
      this.store.fetchData();
      this.setData();
      setTimeout(() => {this.setData()}, 100)
    },
    updateData() {
      console.log(`UPDATE_DATA: ${this.$options.name}`)
      this.edit.updateAll();
      setTimeout(() => {
        this.store.putData();
        this.edit.sendPushSignal();
        setTimeout(() => {
          this.edit.sendPushSignal();
          this.edit.setLoading(false);
          this.$Global.Tools.message(1)
        }, 2000)
      }, 500);
    },

    recoverData() {
      this.fetchFlag = false;
      this.store.fetchData();
      this.setData();
      setTimeout(() => {this.setData()}, 100)
    },

    snackBar() {
      let options = new this.$Global.Tools.SnackBarOptions();
      options.onAction = this.recoverData;
      this.$snackbar.open(options);
    },
  },

  mounted() {
    this.setData();
  }
};
