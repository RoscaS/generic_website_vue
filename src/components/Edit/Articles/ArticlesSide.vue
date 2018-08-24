<template>
  <section>
    <h3>Articles</h3>

    <div class="columns is-variable is-2 ">
      <div class="column is-6 primary">
        <transition name="fade">
          <div v-if="primary">
            <DragSortArticles :store="primary">
              <ArticlesBox v-for="(article, idx) in primary.articles"
                           :key="idx"
                           :article="article"
                           :description="false"
                           color="#209CEE">
              </ArticlesBox>
            </DragSortArticles>
          </div>
        </transition>
      </div>

      <div class="column is-6 secondary">
        <transition name="fade">
          <div v-if="secondary">
            <DragSortArticles :store="secondary">
              <ArticlesBox v-for="(article, idx) in secondary.articles"
                           :key="idx"
                           :article="article"
                           :description="false"
                           color="#00D1B2">
              </ArticlesBox>
            </DragSortArticles>
          </div>
        </transition>
      </div>
    </div>

  </section>
</template>

<script>
  import CategoriesStore from "./CategoriesStore";
  import ArticlesBox from "./ArticlesBox";
  import DragSortArticles from './DragSortArticles';

  export default {
    name: "ArticlesSide",
    components: {ArticlesBox, DragSortArticles},
    data: () => ({}),
    computed: {
      edit() {
        return CategoriesStore;
      },
      primary: {
        get() {return this.edit.state.primaryStore;},
        set(value) {this.edit.state.primaryStore = value;}
      },
      secondary: {
        get() {return this.edit.state.secondaryStore;},
        set(value) {this.edit.state.secondaryStore = value;}
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  h3 {
    margin-bottom: 0;
  }

  .columns {
    padding: .25rem;
    margin-top: 1rem;
    /*width: 70%;*/
  }


</style>
