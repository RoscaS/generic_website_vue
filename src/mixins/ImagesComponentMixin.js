import GalleriesEditStore
  from '../components/Edit/Galleries/GalleriesEditStore';

export default {
  name: 'ImagesComponentMixin',
  data() {
    return {};
  },
  computed: {
    edit() { return GalleriesEditStore; },
    store() { return GalleriesEditStore.getStore(this.component); },
    state() {return GalleriesEditStore.getStore(this.component).state;
    },
  },
  methods: {
    snackBar() {
      let options = new this.$Global.Tools.SnackBarOptions();
      options.onAction = this.recoverData;
      this.$snackbar.open(options);
    },
  },
};
