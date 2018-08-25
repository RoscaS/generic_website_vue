<template>
  <section>
    <transition name="fade">
      <div v-if="category">
        <DragSortArticles :store="category">
          <ArticlesBox v-for="(article, idx) in category.articles"
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
  import DragSortArticles from './DragSortArticles';

	export default {
		name: "CategoryDetail",
    components: {ArticlesBox, DragSortArticles},
    props: {
      category: {type: Object},
      color: {type: String},
    },
    data: () => ({
      empty: 'Cette catégorie est vide.',
    }),
    computed: {
      edit() {
        return CategoriesStore;
      },
    },
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

</style>
