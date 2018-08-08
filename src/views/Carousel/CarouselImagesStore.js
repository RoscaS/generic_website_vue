import Vue from 'vue';
import mixin from '../../mixins/Galleries/ImagesStoreMixin';


const CarouselImageStore = new Vue({
  name: 'CarouselImagesStore',
  related: 'Carousel',
  url: 'galleries/carousel/',
  mixins: [mixin],
  data: {
    // fetchFlag: false,
    state: { images: [] },
  },
});

export default CarouselImageStore;
