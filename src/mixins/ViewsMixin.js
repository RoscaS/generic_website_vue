import BaseLayout from '../views/BaseLayout';
import TextsEditStore from '../components/Edit/Texts/TTextsEditStore';
import GalleriesEditStore from '../components/Edit/Galleries/GalleriesEditStore';


export default {
  components: {BaseLayout},
  data() {
    return {
      editTypes: {text: TextsEditStore, image: GalleriesEditStore},
    };
  },
  computed: {
    edit() { return this.editTypes[this.type] },
    store() { return this.edit.getStore(this.component); },
    state() { return this.store.state; },
    tools() { return this.$Global.Tools; },
  },
  methods: {
    highlighted(idx) {
      return (this.edit.activeTab == idx) && this.checkComponent();
    },
    checkComponent() {
      return this.edit.component === this.store.related;
    },
    sReveal(side, delay, distance = 100, duration = 1500) {
      return new this.tools.ScrollRevealOptions(
        side, delay, distance, duration
      )
    },
    snackBar() {
      let options = new this.$Global.Tools.SnackBarOptions();
      options.onAction = this.recoverData;
      this.$snackbar.open(options);
    },
  },
};
