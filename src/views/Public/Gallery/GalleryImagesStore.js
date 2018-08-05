import Vue from 'vue';
import mixin from '../../../mixins/Galleries/ImagesStoreMixin';


const GalleryImagesStore = new Vue({
  url: 'galleries/events/',
  mixins: [mixin],
  data: {
    fetchFlag: false,
    state: { images: [] },
  },
});

export default GalleryImagesStore;
