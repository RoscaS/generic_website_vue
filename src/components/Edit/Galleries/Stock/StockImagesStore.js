import Vue from 'vue';
import mixin from '../../../../mixins/Galleries/ImagesStoreMixin';


const StockImagesStore = new Vue({
  name: 'StockImagesStore',
  related: 'Stock',
  url: 'galleries/stock/',
  mixins: [mixin],
  data: {
    // fetchFlag: false,
    state: { images: [] },
  },
});

export default StockImagesStore;
