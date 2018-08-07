import axios from "axios";

export default {
  data: {
    component: null,
    fetchFlag: false,
    dataSet: false,
  },
  computed: {
    tools() { return this.$Global.Tools; },
  },

  methods: {
    fetchData() {
      axios.get(this.$options.url).then(response => {
        this.state.images.length = 0;
        response.data.images.forEach(image => {
          this.state.images.push({
            url: image.image,
            name: image.name,
            description: image.description,
            position: image.position,
            id: image.id,
            gallery: image.gallery,
          });
        });
        this.fetchFlag = true;
        // console.log(`Fetch done: ${this.state.images[0].gallery}\tflag: ${this.fetchFlag}`)
      }).catch(error => {
        console.log(`${this.url}\n${error}`);
      });
    },
  }
};
