import EditStore from '../../components/Edit/EditStore'

export default {
  data: {
    fetchFlag: false,
    component: null,
    edit: EditStore,
  },
  computed: {
    tools() { return this.$Global.Tools; },
  },

  methods: {
    setComponent(value) {
      this.component = value
    },
    copyData(from, to) {
      for (let i in from) {to[i] = from[i]; }
    },
    postCommit(error = null) {
      this.edit.setLoading(false);
      this.edit.setDirty(false);
      if (error) {
        this.tools.errorMessage(this.$options.url, error);
        this.recoverData();
      } else {
        this.tools.message(1);
      }
    },
    recoverData() {
      this.copyData(this.backup, this.state);
      this.tools.message(2);
    },
  }
};
