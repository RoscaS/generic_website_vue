import Vue from 'vue';
import axios from 'axios';
import mixin from '../../mixins/PublicStoreMixin';


const ReviewStore = new Vue({
  mixins: [mixin],
  url: 'review/1/',
  data: {
    reviewAll: null,
    reviewNew: null,
    overall: null,
    reviews: null,
    state: {title: '', subTi: '',},
  },
  methods: {
    fetchData() {
      axios.get(this.$options.url).then(response => {
        this.state.title = response.data.title;
        this.state.subTi = response.data.sub_title;
        this.reviewAll = response.data.g_review_all_url;
        this.reviewNew = response.data.g_review_new_url;
        this.overall = response.data.reviews.overall;
        this.reviews = response.data.reviews.reviews;
        this.fetchFlag = true;
      }).catch(error => { console.log(`${this.$options.url}\n${error}`);});
    },
    pushData() {
      axios.put(this.$options.url, {
        title: this.state.title,
        sub_title: this.state.subT1,
      }).then(() => {
        setTimeout(() => { this.postCommit(); }, 2000);
      }).catch(error => { this.postCommit(error); });
    },
  },
});

export default ReviewStore;
