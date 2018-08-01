import EditStore from '../components/Components/Edit/EditStore'

export default {
  data: {
    component: null,
    edit: EditStore,
  },
  computed: {
    tools() { return this.$Global.Tools; },
    pushSignal() { return this.edit.pushSignal; },
    recoverSignal() { return this.edit.recoverSignal; },
    backupSignal() { return this.edit.backupSignal; },
  },
  watch: {
    pushSignal() {
      if (this.checkSignal(this.pushSignal)) { this.commitData(); }
    },
    recoverSignal() {
      if (this.checkSignal(this.recoverSignal)) { this.recoverData(); }
    },
    backupSignal() {
      if (this.checkSignal(this.backupSignal)) { this.backupData(); }
    },
    state: {
      handler() {
        if (this.component == this.edit.component && !this.edit.dirty) {
          this.dirtyCheck()
        }
      },
      deep: true
    },
  },
  methods: {
    setComponent(value) {
      this.component = value
    },
    copyData(from, to) {
      for (let i in from) {to[i] = from[i]; }
    },
    commitData() {
      this.pushData();
    },
    postCommit(error = null) {
      this.edit.setDirty(false);
      this.edit.setLoading(false);
      if (error) {
        this.tools.errorMessage(this.$options.url, error);
        this.recoverData();
      } else {
        this.tools.message(1);
        this.backupData();
      }
    },
    recoverData() {
      this.copyData(this.backup, this.state);
      this.tools.message(2);
    },
    backupData() {
      this.copyData(this.state, this.backup);
    },
    dirtyCheck() {
      for (let i in this.backup) {
        if (this.backup[i] !== this.state[i]) {
          this.edit.setDirty(true);
          return
        }
      }
    },
    checkSignal(signal) {
      return signal && this.component == this.edit.component
    }
  }
};
