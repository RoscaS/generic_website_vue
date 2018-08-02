import Vue from 'vue';
import mixin from '../../../mixins/ImageStore'

const CarouselStore = new Vue({
  url: 'galleries/carousel/',
  mixins: [mixin],
  data: {
    state: {
      images: []
    }
  },
});

export default CarouselStore;
