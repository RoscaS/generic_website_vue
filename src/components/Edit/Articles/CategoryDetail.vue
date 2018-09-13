<template>
  <section>
    <transition name="fade">
      <div v-if="category">
        <DragSortArticles :store="category">
          <ArticlesBox v-if="category.articles.length"
                       v-for="(article, idx) in category.articles"
                       :key="idx"
                       :article="article"
                       :description="false"
                       :color="color">
          </ArticlesBox>
        </DragSortArticles>
        <div v-if="!category.articles.length" class="has-text-centered">
          <h4 :style="{color: color}">{{ empty }}</h4>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import CategoriesStore from "./CategoriesStore";
import ArticlesBox from "./ArticlesBox";
import DragSortArticles from "./DragSortArticles";

export default {
  name: "CategoryDetail",
  components: { ArticlesBox, DragSortArticles },
  props: {
    category: { type: Object },
    color: { type: String }
  },
  data: () => ({
    empty:
      "Cette catégorie est vide. Il est nécéssaire de créér un premier article avant de pouvoir y glisser des articles d'autres catégories."
  }),
  computed: {
    edit() {
      return CategoriesStore;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

h4 {
  text-align: left;
}
</style>
