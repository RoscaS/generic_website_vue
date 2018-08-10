import GalleriesEditStore
  from '../../components/Edit/Galleries/GalleriesEditStore';

export default {
  name: 'ImagesComponentMixin',
  data() {
    return {
      edit: GalleriesEditStore,
    };
  },
  methods: {
    checkComponent() {
      return this.edit.component === this.component;
    },
    checkSignal(signal) {
      return signal && this.checkComponent();
    },
    pushData() {
      this.fetchFlag = false;
      this.store.fetchData();
      this.setData();
      setTimeout(() => {this.setData();}, 100);
    },
    updateData() {
      console.log(`UPDATE_DATA: ${this.$options.name}`);
      this.edit.updateAll();
      setTimeout(() => {
        this.store.putData();
        this.edit.sendPushSignal();
        setTimeout(() => {
          this.edit.sendPushSignal();
          this.edit.setLoading(false);
          this.$Global.Tools.message(1);
        }, 2000);
      }, 500);
    },
    recoverData() {
      this.fetchFlag = false;
      this.store.fetchData();
      this.setData();
      setTimeout(() => {this.setData();}, 100);
    },
    snackBar() {
      let options = new this.$Global.Tools.SnackBarOptions();
      options.onAction = this.recoverData;
      this.$snackbar.open(options);
    },
  },
  mounted() {
    // this.setData();
  }
};
