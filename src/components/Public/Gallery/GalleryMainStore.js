import Vue from 'vue';
import axios from 'axios';
import mixin from '../../../mixins/PublicStoreMixin'

const GalleryMainStore = new Vue ({
  mixins: [mixin],
  url: 'gallery/1/',
  data: {
    state: { title: '', subTi: '', },
    backup: { title: '', subTi: '', },
  },
  methods: {
    fetchData() {
      axios.get(this.$options.url).then(response => {
        this.state.title = response.data.title;
        this.state.subTi = response.data.sub_title;
      }).catch(error => { console.log(`${this.$options.url}\n${error}`);});
    },
    pushData() {
      axios.put(this.$options.url, {
        title: this.state.title,
        sub_title: this.state.subTi,
        image: this.state.image,
      }).then(() => {
        setTimeout(() => { this.postCommit(); }, 2000);
      }).catch(error => { this.postCommit(error); });
    },
  }
});

export default GalleryMainStore;

