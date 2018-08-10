import axios from "axios";

export default {
  data: {},
  computed: {
    tools() { return this.$Global.Tools; },
    string() { return this.related.toLowerCase(); },
  },

  methods: {
    fetchData() {
      axios.get(this.url).then(response => {
        this.buildImageList(response);
        this.fetchFlag = true;
      }).catch(error => {
        console.log(`${this.url}\n${error}`);
      });
    },

    buildImageList(response) {
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
      this.sortByPosition();
    },

    sortByPosition() {
      this.state.images = this.state.images.sort((a, b) => {
        return a.position - b.position;
      });
    },
  },
};

