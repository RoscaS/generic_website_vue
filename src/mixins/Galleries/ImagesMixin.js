
export default {
  computed: {

  },

  methods: {
    setData() {
      if (this.store.fetchFlag) {
        this.state.images = this.store.state.images.slice();
      } else {
        setTimeout(() => { this.setData(); }, 2);
      }
    }
  },
  created() {
    this.store.fetchData();
  },

  mounted() {
    this.setData();
  }
};
