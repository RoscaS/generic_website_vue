import Vue from 'vue';
import mixin from '../../../mixins/Galleries/ImagesStoreMixin';

const StockImagesStore = new Vue({
  name: 'StockImagesStore',
  mixins: [mixin],
  data: {
    title: 'Stock',
    related: 'Stock',
    url: 'galleries/stock/',
    state: {images: []},
  },
});

export default StockImagesStore;
