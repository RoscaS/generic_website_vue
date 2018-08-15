import BuildGalleriesStores from './BuildGalleriesStores';
import axios from "axios";
import Vue from 'vue';

const GalleriesEditStore = new Vue({
  name: 'GalleriesEditStore',
  data: {
    type: 'image',
    state: new BuildGalleriesStores,
    ActiveTab: 0,
    Loading: false,
    SecondaryStore: null,
    SelectedImage: null,
  },

  computed: {
    activeTab: {
      get() { return this.ActiveTab; },
      set(value) { this.ActiveTab = value; }
    },
    loading: {
      get() { return this.Loading; },
      set(value) { this.Loading = value; }
    },
    secondaryStore: {
      get() { return this.SecondaryStore; },
      set(store) { this.SecondaryStore = store; }
    },
    selectedImage: {
      get() { return this.SelectedImage; },
      set(image) { this.SelectedImage = image; }
    }
  },

  methods: {
    setLoading() { this.loading = true; },
    unsetLoading() { this.loading = false; },
    clearSelectedImage() { this.selectedImage = null; },
    message(type) { this.$Global.Tools.message(type);},


    getStore(name) {
      return this.state.filter(i => i.related == name)[0];
    },

    fetchData(store = null) {
      let stores = store ? [store] : this.state;
      stores.forEach(i => {
        axios.get(i.url).then(response => {
          i.state.images.length = 0;
          this.pushImage(i, response.data.images);
        }).catch(error => {
          this.message('imageErr', error, i.url);
        });
      });
    },

    pushImage(store, images) {
      this.buildImagesList(store, images);
      this.sortByPosition(store);
    },

    buildImagesList(store, images) {
      images.forEach(i => {
        store.state.images.push({
          url: i.image,
          name: i.name,
          description: i.description,
          position: i.position,
          id: i.id,
          gallery: i.gallery.split(/\s+/).map(w => {
            return w[0].toUpperCase() + w.slice(1);
          }).join(' ')
        });
      });
    },

    sortByPosition(store) {
      let images = store.state.images;
      images = images.sort((a, b) => {
        return a.position - b.position;
      });
    },
    update() {
      this.loading = true;
      this.state.forEach(i => {
        console.log(`update: ${i.related}`);
        this.updatePosition(i);
        this.updateGalleryField(i);
        this.patchData(i);
      });
      this.loading = false;
    },
    updateGalleryField(store) {
      store.state.images.forEach(i => {
        i.gallery = store.string;
      });
    },
    updatePosition(store) {
      if (store.state.images.length) {
        for (let i = 0; i < store.state.images.length; i++) {
          store.state.images[i].position = i + 1;
        }
      }
    },
    patchData(store) {
      let images = store.state.images;
      images.forEach(i => {
        let url = `images/${i.id}/`;
        axios.patch(url, this.getForm(i, store), {
          headers: {'content-type': 'multipart/form-data'}
        }).then(() => {
          console.log(`OK: patchData: ${store.related}`);
        }).catch(error => {this.message('error', error, url);});
      });
    },
    getForm(image, store) {
      let gallery = store ? store.string : image.gallery.toLowerCase();
      let formData = new FormData();
      formData.append('id', image.id);
      formData.append('position', image.position);
      formData.append('gallery', gallery);
      return formData;
    },

    updateImage() {
      this.setLoading();
      let url = `images/${this.selectedImage.id}/`;
      let formData = this.getForm(this.selectedImage);
      formData.append('description', this.selectedImage.description);
      axios.patch(url, formData, {
        headers: {'content-type': 'multipart/form-data'}
      }).then(() => {
        setTimeout(() => {
          this.message('updated');
          this.unsetLoading();
          this.clearSelectedImage();
          setTimeout(() => { this.component = null; }, 1000);
        }, 2000);
      }).catch(error => {console.log(error);});
    },

    deleteImage(image) {
      let store = this.getStore(image.gallery);
      let index = store.state.images.indexOf(image);
      let url = `images/${image.id}/`;
      let options = new this.$Global.Tools.SnackBarOptions('delete');
      let toast = this.$toast;
      options.onAction = function() {
        store.state.images.splice(index, 1);
        store.state.images.find(i => i.id == image.id);
        axios.delete(url).then(() => {
          toast.open({
            duration: 2000,
            type: 'is-success',
            message: "Image supprimée du serveur.",
            position: 'is-bottom',
          });
        }).catch(error => {console.log(error);}
        );
      };
      this.$snackbar.open(options);
    },
  },
});

export default GalleriesEditStore;

