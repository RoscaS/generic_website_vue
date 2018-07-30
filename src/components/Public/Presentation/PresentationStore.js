import Vue from 'vue';
import axios from 'axios';

const url = 'presentation/1/';
const successMessage = "Donnée mise à jour!";
const errorMessage = "Une erreur est survenue, un mail automatique vient d'être envoyé à l'administrateur.";
const cancelMessage = "Modifications annulées."

const PresentationStore = new Vue({
  data: {
    state: { title: '', subTitle: '', text1: '', text2: '', image: '', },
    backup: { title: '', subTitle: '', text1: '', text2: '', image: '', },
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
          this.checkDirty() ? this.isDirty = true: this.isDirty = false;
        }
      },
      deep: true
    }
  },
  methods: {
    _copyData(from, to) { for (let i in from) {to[i] = from[i];} },
    setBackupData() { this._copyData(this.state, this.backup); },
    setRecoverData() {
      this._copyData(this.backup, this.state);
      this.tools.message(cancelMessage, 2);
      },

    fetchData() {
      axios.get(url).then(response => {
        this.state.title = response.data.title;
        this.state.subTitle = response.data.sub_title;
        this.state.text1 = response.data.text1;
        this.state.text2 = response.data.text2;
        this.state.image = response.data.image.image;
        this.setBackupData();
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
        this.tools.errorMessage(errorMessage, url, error);
        this.setRecoverData();
      } else {
        this.tools.message(successMessage, 1);
        this.setBackupData();
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
        sub_title: this.state.subTitle,
        text1: this.state.text1,
        text2: this.state.text2,
        image: this.state.image,
      }).then(() => {
        setTimeout(() => { this.postCommit(); }, 2000);
      }).catch(error => { this.postCommit(error); });
    },
  },
});

export default PresentationStore;
