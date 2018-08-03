import EditIcon from '../components/Components/Edit/EditIcon';
import EditNav from '../components/Components/Edit/EditNav';
import FileUpload from '../components/Components/Edit/FileUpload';
import EditStore from '../components/Components/Edit/EditStore';

export default {
  components: {EditIcon, EditNav, FileUpload},
  data() {
    return {
      edit: EditStore,
      name: this.$options.name,
      activeTab: 0,
    };
  },
  computed: {
    loading() { return this.edit.loading; },
    pushSignal() { return this.edit.pushSignal; },
    cancelSignal() { return this.edit.cancelSignal; },
  },
  watch: {
    pushSignal() {
      if (this.checkSignal(this.pushSignal)) {
        this.edit.setLoading(true);
        if (this.isDirty()) {
          this.copyData(this.state, this.store.state);
          this.store.pushData();
        } else {
          this.edit.end();
        }
      }
    },
    cancelSignal() {
      if (this.checkSignal(this.cancelSignal)) {
        if (this.isDirty()) {
          this.snackBar();
        } else {
          this.edit.end();
        }
      }
    },
    recoverSignal() {
      if (this.checkSignal(this.recoverSignal)) { this.recoverData(); }
    },
  },
  methods: {
    checkName() {
      return this.edit.component === this.name;
    },
    highlighted(idx) {
      return (this.activeTab == idx) && this.checkName();
    },


    checkSignal(signal) {
      return signal && this.name == this.edit.component;
    },
    copyData(from, to) {
      for (let i in from) { to[i] = from[i]; }
    },
    setData() {
      if (this.store.fetchFlag) {
        this.copyData(this.store.state, this.state);
      } else {
        setTimeout(() => { this.setData(); }, 2);
      }
    },
    isDirty() {
      for (let i in this.state) {
        if (this.state[i] !== this.store.state[i]) {
          this.edit.setDirty(true);
          return true;
        }
      }
      return false;
    },

    snackBar() {
      this.$snackbar.open({
        message: 'Les modifications seront perdues (Pressez le bouton vert pour sauver).',
        type: 'is-warning',
        position: 'is-top',
        actionText: 'Continuer?',
        duration: this.edit.timeout,
        indefinite: false,
        onAction: () => {
          this.copyData(this.store.state, this.state);
          this.edit.end();
        }
      });
    },
  },
  created() {
    this.store.setComponent(this.name);
    this.store.fetchData();
  },
  mounted() {
    this.setData();
  },
};


