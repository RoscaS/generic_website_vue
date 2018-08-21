import BaseLayout from '../views/Layouts/BaseLayout';
import TextsStore from '../components/Edit/Texts/TextsStore';
import GalleriesStore from '../components/Edit/Galleries/GalleriesStore';

export default {
  components: {BaseLayout},
  data: () => ({
    textsEdit: TextsStore,
    galleriesEdit: GalleriesStore,
    editTypes: {text: TextsStore, image: GalleriesStore},
  }),
  computed: {
    tools() {return this.$Global.Tools;},
    edit() {return this.editTypes[this.type];},
    store() {return this.edit.getStore(this.component);},
    state() {return this.store.state;},
  },
  methods: {
    getImage(idx, store = this.store) {return store.getImage(idx)},

    highlighted(idx) {
      return (this.edit.state.activeTab == idx) && this.checkComponent();
    },
    checkComponent() {
      if (this.edit.state.active) {
        return this.edit.state.currentStore.name === this.store.name;
      }
      return false;
    },
    sReveal(side, delay, distance = 100, duration = 1500) {
      return new this.tools.ScrollRevealOptions(
        side, delay, distance, duration
      );
    },
  },
};
