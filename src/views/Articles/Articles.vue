<template>
  <section class="articles">
    <BaseLayout :store="store">

      <div class="carousel">
        <ArticlesCarousel v-scroll-reveal="sReveal('top', 100, 100, 1500)"/>
      </div>

      <br><br>
    </BaseLayout>
    <EditIcon class="edit-icon"
              top="40px"
              :store="categoriesStore"
              :edit="categoriesStore"/>
    <ArticlesData v-scroll-reveal="sReveal('bottom', 150, 100, 1500)"/>
  </section>
</template>

<script>
import EditIcon from "../../components/Edit/EditIcon";
import ViewsMixin from "../../mixins/ViewsMixin";
import ArticlesData from "./ArticlessData";
import ArticlesCarousel from "./ArticlesCarousel";
import CategoriesStore from "../../components/Edit/Articles/CategoriesStore";

export default {
  name: "Articles",
  mixins: [ViewsMixin],
  components: { EditIcon, ArticlesData, ArticlesCarousel },
  data: () => ({
    component: "Article",
    type: "text",
    categoriesStore: CategoriesStore,
    flash: false
  }),
  computed: {
    categories() {
      return this.getCategories();
    }
  },
  methods: {
    getCategories() {
      let categories = this.editTypes["article"];
      if (categories.state.hasLoaded) {
        return categories.state.stores;
      } else
        setTimeout(() => {
          return this.getCategories();
        }, 100);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

.articles {
  /*min-height: 1000px;*/
}

.carousel {
}
</style>
