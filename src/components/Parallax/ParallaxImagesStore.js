import Vue from 'vue';
import mixin from '../../mixins/Galleries/ImagesStoreMixin';


const ParallaxImagesStore = new Vue({
  url: 'galleries/parallax/',
  mixins: [mixin],
  data: {
    state: { images: [] },
  },
});

export default ParallaxImagesStore;
