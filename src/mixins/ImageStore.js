import axios from 'axios';

export default {
  data: {
    state: {
      images: []
    }
  },
  methods: {
    fetchData() {
      axios.get(this.$options.url).then(response => {
        response.data.images.forEach(image => {
          this.state.images.push({
            url: image.image,
            name: image.name,
            description: image.description,
            position: image.position,
          });
        });
        this.state.images.sort((a, b) => a.position - b.position);
      }).catch(error => {
        console.log(`${this.$options.url}\n${error}`);
      });
    }
  },
};
