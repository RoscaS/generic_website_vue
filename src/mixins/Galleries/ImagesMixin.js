export default {
  methods: {
    setData() {
      if (this.store.fetchFlag) {
        this.state.images = this.store.state.images.slice();
        setTimeout(() => {this.store.dataSet = true;}, 5);
        // console.log(`setData done: ${this.store.state.images[0].gallery}`);
      } else {
        setTimeout(() => { this.setData(); }, 2);
      }
    },
    checkComponent() {
      return this.edit.component === this.$options.name;
    },
  },
  mounted() {
    // console.log(this.state.images)
    this.setData();
  }
};
