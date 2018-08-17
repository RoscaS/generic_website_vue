import BaseLayout from '../views/Layouts/BaseLayout';
import TextsStore from '../components/Edit/Texts/TextsStore';
// import GalleriesStore from '../components/Edit/Galleries/GalleriesStore';
import GalleriesStore from '../components/Edit/Galleries/GGalleriesStore';


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
    tools() { return this.$Global.Tools; },
    images() { return this.storeLoaded() ?  this.store.images : null}
  },
  methods: {
    storeLoaded() {
      try {
        if (this.store.count) return this.store.count
      } catch (e) {
        setTimeout(() => { this.storeLoaded() }, 10)
      }
    },
    highlighted(idx) {
      return (this.edit.activeTab == idx) && this.checkComponent();
    },
    checkComponent() {
      return this.edit.component === this.store.related;
    },
    sReveal(side, delay, distance = 100, duration = 1500) {
      return new this.tools.ScrollRevealOptions(
        side, delay, `${distance}px`, duration
      )
    },
  },
};
