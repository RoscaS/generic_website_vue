import tools from "../utils/tools";
import BaseLayout from "../views/Layouts/BaseLayout";
import SectionsStore from "../components/Edit/Texts/SectionsStore";
import GalleriesStore from "../components/Edit/Galleries/GalleriesStore";
import CategoriesStore from "../components/Edit/Articles/CategoriesStore";

export default {
  components: { BaseLayout },
  data: () => ({
    tools: tools,
    textsEdit: SectionsStore,
    galleriesEdit: GalleriesStore,
    categoriesEdit: CategoriesStore,
    editTypes: {
      text: SectionsStore,
      image: GalleriesStore,
      article: CategoriesStore
    }
  }),
  computed: {
    edit() {
      return this.editTypes[this.type];
    },
    store() {
      return this.edit.getStore(this.component);
    },
    state() {
      return this.store.state;
    }
  },
  methods: {
    getImage(idx, store = this.store) {
      return store.imageAtIndex(idx);
    },

    highlighted(idx) {
      return this.edit.state.activeTab == idx && this.checkComponent();
    },
    checkComponent() {
      if (this.edit.state.active) {
        return this.edit.state.currentStore.name === this.store.name;
      }
      return false;
    },
    sReveal(side, delay, distance = 100, duration = 1500) {
      return new this.tools.ScrollRevealOptions(
        side,
        delay,
        distance,
        duration
      );
    }
  }
};
