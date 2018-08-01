import EditIcon from '../components/Components/Edit/EditIcon';
import EditNav from '../components/Components/Edit/EditNav';
import FileUpload from '../components/Components/Edit/FileUpload';

export default {
  components: {EditIcon, EditNav, FileUpload},
  data() {
    return {
      store: this.store,
      name: this.$options.name,
      activeTab: 0,
    };
  },
  computed: {
    edit() { return this.$Global.EditPannel; },
    loading() { return this.edit.loading; },
  },
  methods: {
    checkName() {
      return this.edit.component === this.name;
    },
    highlighted(idx) {
      return (this.activeTab == idx) && this.checkName();
    },
  },

  mounted() {
    this.store.component = this.name;
    this.store.fetchData();
  }
};


