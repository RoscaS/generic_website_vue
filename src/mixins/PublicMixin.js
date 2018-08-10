import EditIcon from '../components/Edit/EditIcon';
import EditNav from '../components/Edit/Texts/TextsEditMenu';
import TextsEditStore from '../components/Edit/Texts/TextsEditStore';
import BaseLayout from '../views/BaseLayout';
import mixin from './BuildStateMixin'

export default {
  name: "PublicMixin",
  mixins: [mixin],
  components: {EditIcon, EditNav, BaseLayout},
  data() {
    return {
      edit: TextsEditStore,
      tools: this.$Global.Tools,
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
    checkComponent() {
      return this.edit.component === this.$options.name;
    },
    highlighted(idx) {
      return (this.activeTab == idx) && this.checkComponent();
    },


    checkSignal(signal) {
      return signal && this.checkComponent();
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
      let options = new this.tools.SnackBarOptions();
      options.onAction = this.snackBarCallback;
      this.$snackbar.open(options);
    },

    snackBarCallback() {
      for (let i in this.store.state) {
        this.state[i].data = this.store.state[i];
      }
      this.edit.end();
    },

    sReveal(side, delay, distance = 100, duration = 1500) {
      return new this.tools.ScrollRevealOptions(
        side, delay, distance, duration
      )
    },
  },
  created() {
    this.store.setComponent(this.$options.name);
    this.store.fetchData();
  },


  mounted() {
    this.setData();
  },
};


