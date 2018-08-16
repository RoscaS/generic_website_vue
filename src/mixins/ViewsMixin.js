import BaseLayout from '../views/Layouts/BaseLayout';
import TextsStore from '../components/Edit/Texts/TextsStore';
import GalleriesStore from '../components/Edit/Galleries/GalleriesStore';


export default {
  components: {BaseLayout},
  data() {
    return {
      editTypes: {text: TextsStore, image: GalleriesStore},
    };
  },
  computed: {
    edit() { return this.editTypes[this.type] },
    store() { return this.edit.getGallery(this.component); },
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
  },
};
