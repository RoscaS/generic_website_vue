import axios from "../../../http";
import Vue from "vue";
import tools from "../../../utils/tools";
import { Category } from "./CategoryObject";
import GalleriesStore from "../Galleries/GalleriesStore";

const url = "categories/";

const CategoriesStore = new Vue({
  data: () => ({
    name: "CategoriesStore",
    state: {
      stores: [],
      activeTab: 0,
      loading: false,
      hasLoaded: false,
      active: false,

      newItem: null,
      tempImage: null,
      hoveredArticle: null,
      editItem: null,

      primaryStore: null,
      secondaryStore: null,

      draggingType: null
    }
  }),
  computed: {
    gallery() {
      return GalleriesStore.getStore("Articles");
    },

    loading: {
      get() {
        return this.state.loading;
      },
      set(value) {
        this.state.loading = value;
      }
    },
    editItem: {
      get() {
        return this.state.editItem;
      },
      set(value) {
        this.state.editItem = value;
      }
    },
    newItem: {
      get() {
        return this.state.newItem;
      },
      set(value) {
        this.state.newItem = value;
      }
    },
    tempImage: {
      get() {
        return this.state.tempImage;
      },
      set(value) {
        this.state.tempImage = value;
      }
    }
  },
  methods: {
    getStore(name) {
      return this.state.stores.filter(i => i.name == name)[0];
    },
    setLoading() {
      this.state.loading = true;
    },
    unsetLoading() {
      this.state.loading = false;
    },
    fetchData() {
      axios.get(url).then(response => {
        response.data.forEach(i => {
          this.state.stores.push(new Category(i));
        });
        this.sortByPosition();
        this.state.hasLoaded = true;
      });
    },
    sortImages(patch = true) {
      let count = this.gallery.images.length;
      this.state.stores.forEach(store => {
        store.articles.forEach(article => {
          article.image.position = count--;
          if (patch) article.image.patch();
        });
      });
    },
    createCategory(data) {
      this.setLoading();
      axios.post(`categories/`, data).then(response => {
        this.state.stores.push(new Category(response.data));
        setTimeout(() => {
          tools.message("categoryNew");
          this.unsetLoading();
          this.clearNewItem();
        }, 1500);
      });
    },
    updatePosition() {
      this.state.stores.forEach((i, idx) => {
        if (i.position != idx + 1) {
          i.position = idx + 1;
          i.put(false);
        }
      });
    },
    sortByPosition() {
      this.state.stores.sort((a, b) => {
        return a.position - b.position;
      });
    },
    clearEditItem() {
      if (!this.state.loading) this.state.editItem = null;
      else
        setTimeout(() => {
          this.clearEditItem();
        }, 500);
    },
    clearNewItem() {
      if (!this.loading) this.state.newItem = null;
      else
        setTimeout(() => {
          this.clearNewItem();
        }, 500);
    },
    removeCategory(category) {
      let idx = this.state.stores.indexOf(category);
      this.state.stores.splice(idx, 1);
    },
    uploadImage(form) {
      if (this.state.tempImage) {
        this.state.tempImage.delete(false);
      }

      let gallery = GalleriesStore.getStore("Articles");
      gallery.postImage(form, false);
      setTimeout(() => {
        let image = gallery.images[gallery.images.length - 1];
        if (image.name == "tempArticleImage") this.state.tempImage = image;
      }, 500);
    },
    start() {
      this.state.active = true;
    },
    end() {
      this.state.active = false;
      this.state.primaryStore = null;
      this.state.secondaryStore = null;
    }
  },
  created() {
    this.fetchData();
  }
});

export default CategoriesStore;
