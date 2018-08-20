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
    edit() {return this.editTypes[this.type];},
    store() {return this.edit.getStore(this.component);},
    state() {return this.store.state;},
    tools() {return this.$Global.Tools;},
    images() {return this.isReady ? this.store.images : null;}, // galleries
    isReady() {
      try {if (this.store.hasLoaded) return true;}
      catch (e) {setTimeout(() => {return this.isReady;}, 10);}
    },
  },
  methods: {

    image() { // Promo & Presentation
      if (this.isReady) return this.store.gallery.images[0].image;
      else setTimeout(() => {return this.image();}, 10);
    },

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
