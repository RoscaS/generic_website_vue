import EditIcon from '../components/Components/Edit/EditIcon';
import EditNav from '../components/Components/Edit/EditNav';
import FileUpload from '../components/Components/Edit/FileUpload';
import EditStore from '../components/Components/Edit/EditStore'

export default {
  components: {EditIcon, EditNav, FileUpload},
  data() {
    return {
      edit: EditStore,
      name: this.$options.name,
      activeTab: 0,
    };
  },
  computed: {
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
    this.store.setComponent(this.name);
    this.store.fetchData();
  }
};


