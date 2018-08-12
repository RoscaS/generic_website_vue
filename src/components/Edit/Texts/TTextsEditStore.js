import BuildTextsStores from './BuildTextsStores';
import axios from "axios";
import Vue from 'vue';

const TextsEditStoreBis = new Vue({
  name: 'TextsEditStoreBis',
  data: {
    type: 'text',
    state: new BuildTextsStores,
    ActiveTab: 0,

    Loading: false,
    active: false,

    Component: null,

    timeOut: 5000,
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
      this.putData();
    },

    putData() {
      let store = this.getStore(this.component);
      let data = {};
      for (let i in store.state) {
        data[i] = store.state[i].data
      }
      axios.put(store.url, data).then(() => {
        console.log('ici')
        this.finish();
      }).catch(error => {
        console.log(store.url);
        console.log(error);
      });
    },

    start(component) {
      this.component = component;
      this.active = true;
    },

    end() {
      this.loading = false;
      this.active = false;
      setTimeout(() => { this.component = null; }, 1000);
    },

    finish(status = 1) {
      setTimeout(() => {
        this.$Global.Tools.message(status);
        this.unsetLoading();
      }, 2000);

    },

    debug(store, data) {
      console.log(`\n\n\n${store.related}`);
      console.log(`STORE:`);
      for (let i in store.backup) {
        if (i == 'image') {
          console.log(`${i}:\t${store.state[i].image}`);
          console.log(`${i} gallery:\t${store.state[i].gallery}`);
        } else {
          console.log(`${i}:\t${store.state[i]}`);
        }
      }
    },
  }
});

export default TextsEditStoreBis;
