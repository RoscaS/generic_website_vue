import Vue from 'vue';
import mixin from '../../mixins/Galleries/ImagesStoreMixin';

const CarouselImageStore = new Vue({
  name: 'CarouselImagesStore',
  mixins: [mixin],
  data: {
    title: 'Carousel',
    related: 'Carousel',
    url: 'galleries/carousel/',
    state: {images: []},
  },
});

export default CarouselImageStore;
