<template>
  <section>

    <div class="articles-side-header">
      <h3>Articles:</h3>
      <ArticlesOptions class="options"/>
    </div>

    <div class="columns is-mobile is-variable is-2">

      <transition name="custom-fade">
        <div v-if="!primary && !secondary" class="no-selection">
          <h4>{{ noSelection }}</h4>
        </div>
      </transition>

      <div class="column is-6 primary">
        <CategoryDetail :category="primary" color="#209CEE"/>
      </div>

      <div class="column is-6 secondary">
        <CategoryDetail :category="secondary" color="#00D1B2"/>
      </div>
    </div>
  </section>
</template>

<script>
import CategoriesStore from "./CategoriesStore";
import CategoryDetail from "./CategoryDetail";
import ArticlesOptions from './ArticlesOptions'

export default {
  name: "ArticlesSide",
  components: {ArticlesOptions, CategoryDetail },
  data: () => ({
    noSelection: "Sélectionnez jusqu'à deux catégories pour les éditer."
  }),
  computed: {
    edit() {
      return CategoriesStore;
    },
    primary() {
      return this.edit.state.primaryStore;
    },
    secondary() {
      return this.edit.state.secondaryStore;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

.custom-fade-enter-active {
  transition: opacity 0.2s;
  transition-delay: 1.5s;
}

.custom-fade-leave-active {
  transition: opacity 0.4s;
}

.custom-fade-enter,
.custom-fade-leave-to {
  opacity: 0;
}

.articles-side-header{
  display: flex;
  align-items: baseline;

  h3 {
    color: white;
  }
  .options {
    margin-left: auto;
  }
}

.no-selection {
  position: absolute;
  top: 20%;
  left: 32%;

  h4 {
    width: 100%;
    color: #adadad;
  }
}
</style>
