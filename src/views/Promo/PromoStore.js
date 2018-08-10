import Vue from 'vue';
import axios from 'axios';
import mixin from '../../mixins/PublicStoreMixin'

const PromoStore = new Vue({
  mixins: [mixin],
  url: 'promo/1/',
  data: {
    state: {title: '', text: '', image: '',},
  },
  methods: {
    fetchData() {
      axios.get(this.$options.url).then(response => {
        this.state.title = response.data.title;
        this.state.text = response.data.text;
        this.state.image = response.data.image.image;
        this.fetchFlag = true;
      }).catch(error => { console.log(`${this.$options.url}\n${error}`);});
    },
    pushData() {
      axios.put(this.$options.url, {
        title: this.state.title,
        text: this.state.text,
        image: this.state.image,
      }).then(() => {
        setTimeout(() => { this.postCommit(); }, 2000);
      }).catch(error => { this.postCommit(error); });
    },
  },
});


export default PromoStore;
