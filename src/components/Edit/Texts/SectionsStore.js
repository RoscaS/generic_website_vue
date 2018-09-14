import { Dialog } from "buefy";
import axios from "../../../http";
import urls from "../../../urls";
import settings from "../../../site-settings";
import Vue from "vue";
import GalleriesStore from "../Galleries/GalleriesStore";

import {
  Promo,
  Presentation,
  Events,
  Article,
  Hero,
  Contact,
  SiteInfo,
  SiteContact,
  SiteOptions,
  GenericSection
} from "./SectionsObjects";

const SectionsStore = new Vue({
  data: () => ({
    name: "TextsEditStore",
    state: {
      stores: [
        new Promo(),
        new Presentation(),
        new Events(),
        new Article(),
        new Hero(),
        new Contact(),
        new SiteInfo(),
        new SiteContact(),
        new SiteOptions()
      ],
      activeTab: 0,
      loading: false,
      active: false,
      currentStore: null
    }
  }),
  computed: {
    loading: {
      get() {
        return this.state.loading;
      },
      set(value) {
        this.state.loading = value;
      }
    },

    activeTab: {
      get() {
        return this.state.activeTab;
      },
      set(value) {
        this.state.activeTab = value;
      }
    },

    currentStore: {
      get() {
        return this.state.currentStore;
      },
      set(value) {
        this.state.currentStore = value;
      }
    },

    genericStores() {
      return this.state.stores.filter(i => i.isGeneric);
    }
  },

  methods: {
    setLoading() {
      this.state.loading = true;
    },
    unsetLoading() {
      this.state.loading = false;
    },
    getStore(name) {
      return this.state.stores.filter(i => i.name === name)[0];
    },

    cancelNotification() {
      Dialog.confirm({
        message: "Cette action annulera les modifications!",
        confirmText: "Continuer",
        cancelText: "Sauver & quitter",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          this.currentStore.recoverData();
          this.end();
        },
        onCancel: () => {
          this.update();
        }
      });
    },
    checkAddons() {
      if (settings.siteAddons.genericSection) {
        this.getStore('Presentation')['isGeneric'] = true;
      }
    },

    initGenericSections() {
      axios.get(urls.sections).then(response => {
        response.data.forEach(section => {
          GalleriesStore.initGenericSectionsGallery(section);
          let genericSection = new GenericSection(section.name);
          this.setData(genericSection, section);
          this.state.stores.push(genericSection);
        });
        this.checkAddons()
      });
    },

    fetchData() {
      this.state.stores.forEach(store => {
        axios.get(store.url).then(response => {
          this.setData(store, response.data);
        });
      });
    },

    setData(store, response) {
      for (let i in store.state) {
        store.state[i].data = response[i];
        store.backup[i] = response[i];
      }
      store.hasGallery ? store.setGallery() : null;
    },

    update() {
      if (this.currentStore.isDirty()) {
        this.setLoading();
        this.currentStore.update();
        setTimeout(() => {
          this.unsetLoading();
          setTimeout(() => {
            this.end();
          }, 500);
        }, 1500);
        return;
      }
      setTimeout(() => {
        this.end();
      }, 500);
    },

    cancel() {
      if (this.currentStore.isDirty()) {
        this.cancelNotification();
      } else {
        this.end();
      }
    },

    start(store) {
      this.state.active = true;
      this.currentStore = store;
      this.currentStore.setBackup();
    },

    end() {
      this.state.active = false;
      setTimeout(() => {
        this.unsetLoading();
        this.state.currentStore = null;
      }, 1000);
    }
  },
  created() {
    this.fetchData();
    this.initGenericSections();
    Vue.prototype.$siteOptions = this.getStore("SiteOptions");
  }
});

export default SectionsStore;
