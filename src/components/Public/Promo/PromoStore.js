import Vue from 'vue';
import axios from 'axios';

const url = 'promo/1/';


const PromoStore = new Vue({
  data: {
    state: {title: '', text: '', image: '',},
    backup: {title: '', text: '', image: '',},
  },
  computed: {
    edit() { return this.$Global.EditPannel; },
    tools() { return this.$Global.Tools; },
    loading: {
      get() { return this.edit.loading; },
      set(value) { this.edit.loading = value; }
    },
    isDirty: {
      get() { return this.edit.dirty; },
      set(value) { this.edit.dirty = value; }
    }
  },
  watch: {
    state: {
      handler() {
        if (!this.isDirty) {
          this.checkDirty() ? this.isDirty = true : this.isDirty = false;
        }
      },
      deep: true
    }
  },
  methods: {
    _copyData(from, to) { for (let i in from) {to[i] = from[i];} },
    backupData() { this._copyData(this.state, this.backup); },
    recoverData() {
      this._copyData(this.backup, this.state);
      this.tools.message(2);
    },

    fetchData() {
      axios.get(url).then(response => {
        this.state.title = response.data.title;
        this.state.text = response.data.text;
        this.state.image = response.data.image.image;
        this.backupData();
      }).catch(error => { console.log(`${url}\n${error}`);});
    },
    commit() {
      if (this.checkDirty()) {
        this.loading = true;
        this.pushData();
      }
    },
    postCommit(error = null) {
      this.isDirty = false;
      this.loading = false;
      if (error) {
        this.tools.errorMessage(url, error);
        this.recoverData();
      } else {
        this.tools.message(1);
        this.backupData();
      }
    },
    checkDirty() {
      for (let i in this.backup) {
        if (this.backup[i] !== this.state[i]) {
          return true;
        }
      }
      return false;
    },
    pushData() {
      axios.put(url, {
        title: this.state.title,
        text: this.state.text,
        image: this.state.image,
      }).then(() => {
        setTimeout(() => { this.postCommit(); }, 2000);
      }).catch(error => { this.postCommit(error); });
    },
  },
});


export default PromoStore;
