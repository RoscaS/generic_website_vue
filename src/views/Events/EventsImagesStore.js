import Vue from 'vue';
import mixin from '../../mixins/Galleries/ImagesStoreMixin';

const EventsImagesStore = new Vue({
  name: 'EventsImagesStore',
  mixins: [mixin],
  data: {
    title: 'Galerie',
    related: 'Events',
    url: 'galleries/events/',
    state: {images: []},
  },
});

export default EventsImagesStore;
