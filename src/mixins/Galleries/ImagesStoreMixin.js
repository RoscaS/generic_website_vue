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
        this.buildImageList(response);
        this.sortByPosition();
        this.fetchFlag = true;
      }).catch(error => {
        console.log(`${this.url}\n${error}`);
      });
    },

    putData() {
      let images = this.state.images;
      for (let i in images) {
        let url = `images/${images[i].id}/`;
        let formData = new FormData();
        formData.append('id', images[i].id);
        formData.append('position', images[i].position);
        formData.append('gallery', images[i].gallery.toLowerCase());

        axios.patch(url, formData, {
          headers: {'content-type': 'multipart/form-data'}
        }).then((response) => {
          console.log('putData: OK');
          // console.log(response.data)
        }).catch(error => {
          console.log(url)
          console.log(error)
        })
      }
    },

    buildImageList(response) {
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
    },

    sortByPosition() {
      this.state.images = this.state.images.sort((a, b) => {
        return a.position - b.position;
      });
    }
  },
};
