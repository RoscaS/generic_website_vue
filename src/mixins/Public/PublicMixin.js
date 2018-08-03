import EditIcon from '../../components/Components/Edit/EditIcon';
import EditNav from '../../components/Components/Edit/EditNav';
import FileUpload from '../../components/Components/Edit/FileUpload';
import EditStore from '../../components/Components/Edit/EditStore';
import BaseLayout from '../../components/Components/BaseLayout'

export default {
  components: {EditIcon, EditNav, FileUpload, BaseLayout},
  data() {
    return {

      edit: EditStore,
      name: this.$options.name,
      activeTab: 0,
      timeout: 5000,
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
          for (let i in this.store.state) {
            this.store.state[i] = this.state[i].data;
          }
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
    setData() {
      if (this.store.fetchFlag) {
        for (let i in this.store.state) {
          this.state[i].data = this.store.state[i];
        }
      } else {
        setTimeout(() => { this.setData(); }, 2);
      }
    },
    isDirty() {
      for (let i in this.state) {
        if (this.state[i].data !== this.store.state[i]) {
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
          for (let i in this.store.state) {
            this.state[i].data = this.store.state[i];
          }
          this.edit.end();
        }
      });
    },
    sReveal(side, delay, distance = 100, duration = 1500) {
      return {
        origin: side,
        distance: `${distance}px`,
        duration: duration,
        delay: delay,
        easing: 'ease',
      };
    }
  },
  created() {
    this.store.setComponent(this.name);
    this.store.fetchData();
  },
  mounted() {
    this.setData();
  },
};


