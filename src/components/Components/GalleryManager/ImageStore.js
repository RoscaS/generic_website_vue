import axios from 'axios';
import Vue from "vue";


const ImageStore = new Vue({
  data: {
    galeries: {
      carousel: { url: 'galleries/carousel/', state: { images: [] }},
      gallery: { url: 'galleries/events/', state: { images: [] }}
    }
  },
  methods: {
    init() {
      for (let gallery in this.galeries) {
        this.fetchData(this.galeries[gallery]);
      }
    },
    fetchData(gallery) {
      axios.get(gallery.url).then(response => {
        response.data.images.forEach(image => {
          gallery.state.images.push({
            url: image.image,
            name: image.name,
            description: image.description,
            position: image.position,
          });
        });
      }).catch(error => {
        console.log(`${gallery.url}\n${error}`);
      });
    }
  },
});

export default ImageStore;
