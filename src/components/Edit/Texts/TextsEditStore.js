import BuildTextsStores from './BuildTextsStores';
import axios from "axios";
import Vue from 'vue';

const TextsEditStore = new Vue({
  name: 'TextsEditStore',
  data: {
    type: 'text',
    state: new BuildTextsStores,
    ActiveTab: 0,
    Loading: false,
    active: false,
    Component: null,
  },

  computed: {
    activeTab: {
      get() { return this.ActiveTab; },
      set(value) { this.ActiveTab = value; }
    },
    loading: {
      get() { return this.Loading; },
      set(value) { this.Loading = value; }
    },
    component: {
      get() { return this.Component; },
      set(value) { this.Component = value; }
    }
  },

  methods: {
    setLoading() { this.Loading = true; },
    unsetLoading() { this.Loading = false; },

    getStore(name) {
      return this.state.filter(i => i.related == name)[0];
    },

    fetchData() {
      this.state.forEach(store => {
        axios.get(store.url).then(response => {
          this.setData(store, response.data);
        }).catch(error => {
          console.log(`${store.url}\n${error}`);
        });
      });
    },

    setData(store, response) {
      for (let i in store.state) {
        store.state[i].data = response[i];
        store.backup[i] = response[i]
      }
    },

    update() {
      this.setLoading();
      let store = this.getStore(this.component);
      let data = {};
      for (let i in store.state) {
        data[i] = store.state[i].data
      }
      axios.put(store.url, data).then(() => {
        setTimeout(() => {
          this.$Global.Tools.message(1);
          this.unsetLoading();
          this.active = false;
          setTimeout(() => { this.component = null; }, 1000);
        }, 2000);
      }).catch(error => {
        console.log(store.url);
        console.log(error);
      });
    },

    storeIsDirty() {
      let store = this.getStore(this.component);
      for (let i in store.state) {
        if (store.state[i].data !== store.backup[i]) {
          return true
        }
      }
      return false
    },

    recoverData() {
      let store = this.getStore(this.component);
      for (let i in store.state) {
        store.state[i].data = store.backup[i]
      }
      this.$Global.Tools.message(2);
      this.end();
    },

    snackBar() {
      let options = new this.$Global.Tools.SnackBarOptions();
      options.onAction = this.recoverData;
      this.$snackbar.open(options);
    },

    start(component) {
      this.component = component;
      this.active = true;
    },

    end() {
      if (this.storeIsDirty()) {
        this.snackBar();
      } else {
        this.unsetLoading();
        this.active = false;
        setTimeout(() => { this.component = null; }, 1000);
      }
    },

  }
});

export default TextsEditStore;
