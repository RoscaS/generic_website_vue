import Vue from 'vue';
import axios from 'axios';
import mixin from '../../../mixins/Public/PublicStoreMixin'


const PresentationStore = new Vue({
  mixins: [mixin],
  url: 'contact/1/' ,
  fetchFlag: false,
  data: {
    state: { title: '', subT1: '', subT2: '', subT3: '', },
  },
  methods: {
    fetchData() {
      axios.get(this.$options.url).then(response => {
        this.state.title = response.data.title;
        this.state.subT1 = response.data.sub_title;
        this.state.subT2 = response.data.sub_title2;
        this.state.subT3 = response.data.sub_title3;
        this.fetchFlag = true;
      }).catch(error => { console.log(`${this.$options.url}\n${error}`);});
    },
    pushData() {
      axios.put(this.$options.url, {
        title: this.state.title,
        sub_title: this.state.subT1,
        sub_title2: this.state.subT2,
        sub_title3: this.state.subT3,
      }).then(() => {
        setTimeout(() => { this.postCommit(); }, 2000);
      }).catch(error => { this.postCommit(error); });
    },
  },
});

export default PresentationStore;
