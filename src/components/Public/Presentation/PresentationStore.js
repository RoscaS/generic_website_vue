import Vue from 'vue';
import axios from 'axios';
import mixin from '../../../mixins/PublicStoreMixin'


const PresentationStore = new Vue({
  mixins: [mixin],
  url: 'presentation/1/' ,
  data: {
    state: { title: '', subTi: '', text1: '', text2: '', image: '', },
    backup: { title: '', subTi: '', text1: '', text2: '', image: '', },
  },
  methods: {
    fetchData() {
      axios.get(this.$options.url).then(response => {
        this.state.title = response.data.title;
        this.state.subTi = response.data.sub_title;
        this.state.text1 = response.data.text1;
        this.state.text2 = response.data.text2;
        this.state.image = response.data.image.image;
      }).catch(error => { console.log(`${this.$options.url}\n${error}`);});
    },
    pushData() {
      axios.put(this.$options.url, {
        title: this.state.title,
        sub_title: this.state.subTi,
        text1: this.state.text1,
        text2: this.state.text2,
        image: this.state.image,
      }).then(() => {
        setTimeout(() => { this.postCommit(); }, 2000);
      }).catch(error => { this.postCommit(error); });
    },
  },
});

export default PresentationStore;
