import Vue from 'vue';
import mixin from '../../mixins/Galleries/ImagesStoreMixin';

const EventsImagesStore = new Vue({
  name: 'EventsImagesStore',
  related: 'Events',
  url: 'galleries/events/',
  mixins: [mixin],
  data: {
    // fetchFlag: false,
    state: { images: [] },
  },
});

export default EventsImagesStore;
