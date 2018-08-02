import Vue from 'vue';
import mixin from '../../../../mixins/ImageStore'

const GalleryImagesStore = new Vue({
  url: 'galleries/events/',
  mixins: [mixin],
  data: {
    state: {
      images: []
    }
  },
});

export default GalleryImagesStore;
