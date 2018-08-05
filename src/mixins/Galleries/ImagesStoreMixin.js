import axios from "axios";

export default {
  data: {
    component: null,
  },
  computed: {
    tools() { return this.$Global.Tools; },
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
          this.fetchFlag = true;
        });
      }).catch(error => {
        console.log(`${this.url}\n${error}`);
      });
    },
  }
};
