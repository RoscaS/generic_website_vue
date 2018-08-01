export default {
  data: {
    component: '',
  },
  computed: {
    edit() { return this.$Global.EditPannel; },
    tools() { return this.$Global.Tools; },
    pushSignal() { return this.edit.pushSignal; },
    recoverSignal() { return this.edit.recoverSignal; },
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
    recoverSignal() {
      if (this.edit.recoverSignal && this.checkComponent()) {
        console.log('dedans')
        this.recoverData();
      }
    },
    pushSignal() {
      if (this.edit.pushSignal && this.checkComponent()) {
        this.pushData();
      }
    },
    state: {
      handler() {
        if (!this.isDirty) {
          this.checkDirty() ? this.isDirty = true : this.isDirty = false;
        }
      },
      deep: true
    },
  },
  methods: {
    _copyData(from, to) {
      for (let i in from) {
        to[i] = from[i];
      }
    },
    backupData() {
      this._copyData(this.state, this.backup);
    },
    recoverData() {
      this._copyData(this.backup, this.state);
      this.tools.message(2);
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
        this.tools.errorMessage(this.$options.url, error);
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
    checkComponent() {
      return this.component == this.edit.component
    }
  }
};
