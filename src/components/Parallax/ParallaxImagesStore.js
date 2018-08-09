import Vue from 'vue';
import mixin from '../../mixins/Galleries/ImagesStoreMixin';

const ParallaxImagesStore = new Vue({
  name: 'ParallaxImagesStore',
  mixins: [mixin],
  data: {
    title: 'Parallax',
    related: 'Parallax',
    url: 'galleries/parallax/',
    state: {images: []},
  },
});

export default ParallaxImagesStore;
