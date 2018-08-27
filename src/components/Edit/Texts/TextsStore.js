import axios from "axios";
import {Dialog} from 'buefy';
import {
  Promo,
  Presentation,
  Events,
  Article,
  Hero,
  Contact,
  Review
} from './SectionsObjects';

// axios.defaults.baseURL = 'http://localhost:8000/';

class TextsStore {
  constructor() {
    this.name = 'TextsEditStore';
    // this.type = 'textsStore';
    this.state = {
      stores: [
        new Promo(),
        new Presentation(),
        new Events(),
        new Article(),
        new Hero(),
        new Contact(),
        new Review(),
      ],
      activeTab: 0,
      loading: false,
      active: false,
      currentStore: null,
    };
    this.fetchData();
  }

  get loading() {return this.state.loading;}
  set loading(value) {this.state.loading = value;}

  get activeTab() { return this.state.activeTab; }
  set activeTab(value) { this.state.activeTab = value; }

  get currentStore() { return this.state.currentStore; }
  set currentStore(value) { this.state.currentStore = value; }

  setLoading() {this.state.loading = true;}

  unsetLoading() {this.state.loading = false;}

  getStore(name) {
    return this.state.stores.filter(i => i.name == name)[0];
  }

  cancelNotification() {
    Dialog.confirm({
      message: 'Cette action annulera les modifications!',
      confirmText: "Continuer",
      cancelText: 'Sauver & quiter',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: () => {
        this.currentStore.recoverData();
        this.end();
      },
      onCancel: () => {
        this.update();
      }
    });
  }

  fetchData() {
    this.state.stores.forEach(store => {
      axios.get(store.url).then(response => {
        this.setData(store, response.data);
      });
    });
  }

  setData(store, response) {
    for (let i in store.state) {
      store.state[i].data = response[i];
      store.backup[i] = response[i];
    }
    this.getStore('Presentation').setGallery();
    this.getStore('Promo').setGallery();
  }

  update() {
    if (this.state.dirtyImage || this.currentStore.isDirty()) {
      this.setLoading();
      this.currentStore.update();
      setTimeout(() => {
        this.unsetLoading();
        setTimeout(() => {this.end();}, 500);
      }, 1500);
      return;
    }
    setTimeout(() => {this.end();}, 500);
  }

  cancel() {
    if (this.state.dirtyImage || this.currentStore.isDirty()) {
      this.cancelNotification();
    } else {
      this.end();
    }
  }

  start(store) {
    this.state.active = true;
    this.currentStore = store;
    this.currentStore.setBackup();
  }

  end() {
    this.unsetLoading();
    this.state.active = false;
    setTimeout(() => {this.state.currentStore = null;}, 1000);
  }
}

export default new TextsStore;
