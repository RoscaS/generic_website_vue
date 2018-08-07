import GalleriesEditStore
  from '../../components/Edit/Galleries/GalleriesEditStore';

export default {
  data() {
    return {
      edit: GalleriesEditStore,
    };
  },
  computed: {
    updateSignal() { return this.edit.updateSignal; },
  },
  watch: {
    updateSignal() {
      if (this.checkSignal(this.updateSignal)){
        this.update();
      }
    }
  },
  methods: {
    setData() {
      if (this.store.fetchFlag) {
        console.log(`${this.component}`)
        this.state.images = this.store.state.images.slice();
        setTimeout(() => {this.store.dataSet = true;}, 5);
      } else {
        setTimeout(() => { this.setData(); }, 2);
      }
    },
    checkComponent() {
      return this.edit.component === this.component
    },
    checkSignal(signal) {
      return signal && this.checkComponent();
    },

    update() {
      this.fetchFlag = false;
      this.store.fetchData();
      this.setData();
      setTimeout(() => {this.setData()}, 100)
    }
  },


  mounted() {
    this.setData();
  }
};
