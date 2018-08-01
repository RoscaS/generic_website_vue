import Vue from 'vue';
import axios from 'axios';
import mixin from '../../../mixins/PublicStoreMixin';

const HeroStore = new Vue({
  mixins: [mixin],
  url: 'hero/1/',
  data: {
    state: {
      L_title: '', L_icon: '', L_text: '',
      C_title: '', C_icon: '', C_text: '',
      R_title: '', R_icon: '', R_text: '',
    },
    backup: {
      L_title: '', L_icon: '', L_text: '',
      C_title: '', C_icon: '', C_text: '',
      R_title: '', R_icon: '', R_text: '',
    },
  },
  methods: {
    fetchData() {
      axios.get(this.$options.url).then(response => {
        this.state.L_title = response.data.title1;
        this.state.C_title = response.data.title2;
        this.state.R_title = response.data.title3;

        this.state.L_icon = response.data.icon1;
        this.state.C_icon = response.data.icon2;
        this.state.R_icon = response.data.icon3;

        this.state.L_text = response.data.text1;
        this.state.C_text = response.data.text2;
        this.state.R_text = response.data.text3;
      }).catch(error => { (`${this.$options.url}\n${error}`); });
    },
    pushData() {
      axios.put(this.$options.url, {
        title1: this.state.L_title,
        title2: this.state.C_title,
        title3: this.state.R_title,

        icon1: this.state.L_icon,
        icon2: this.state.C_icon,
        icon3: this.state.R_icon,

        text1: this.state.L_text,
        text2: this.state.C_text,
        text3: this.state.R_text,
      }).then(() => {
        setTimeout(() => { this.postCommit(); }, 2000);
      }).catch(error => { this.postCommit(error); });
    },
  },
});

export default HeroStore;

