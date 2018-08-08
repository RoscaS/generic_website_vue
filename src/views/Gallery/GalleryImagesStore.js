import Vue from 'vue';
import mixin from '../../mixins/Galleries/ImagesStoreMixin';


const GalleryImagesStore = new Vue({
  name: 'GalleryImagesStore',
  related: 'Gallery',
  url: 'galleries/events/',
  mixins: [mixin],
  data: {
    // fetchFlag: false,
    state: { images: [] },
  },
});

export default GalleryImagesStore;
