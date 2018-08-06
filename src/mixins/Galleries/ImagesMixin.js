
export default {
  methods: {
    setData() {
      if (this.store.fetchFlag) {
        this.state.images = this.store.state.images.slice();
      } else {
        setTimeout(() => { this.setData(); }, 2);
      }
    },
    checkComponent() {
      return this.edit.component === this.$options.name;
    },
  },

  created() {
    this.store.fetchData();
  },

  mounted() {
    this.setData();
  }
};
