import Vue from 'vue';
import mixin from '../../../../mixins/Galleries/ImagesStoreMixin';


const StockImagesStore = new Vue({
  url: 'galleries/stock/',
  mixins: [mixin],
  data: {
    // fetchFlag: false,
    state: { images: [] },
  },
});

export default StockImagesStore;
