<template>
  <section>
    <ArticlesCard></ArticlesCard>
    <div class="container">
      <div class="content">
        <transition name="fade">
          <div v-if="!edit.state.editItem && !edit.state.newItem">
            <div class="box main-box">

              <div class="columns">
                <div class="column is-3">
                  <CategoriesSide :categories="edit.state.stores" :edit="edit"/>
                </div>
                <div class="column">
                  <ArticlesSide></ArticlesSide>
                </div>
              </div>

                <div class="add-buttons">
                  <div class="buttons-wrapper">
                    <button class="button is-outlined is-white" @click="createCategory()">
                      Ajouter une catégorie
                    </button>
                    <button class="button is-outlined is-white" @click="createArticle()">
                      Ajouter un article
                    </button>
                  </div>
                </div>

            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import CategoriesStore from "./CategoriesStore";
import CategoriesSide from "./CategoriesSide";
import ArticlesSide from "./ArticlesSide";
import ArticlesCard from "./ArticlesCard";
import BaseLayout from "../../../views/Layouts/BaseLayout";

export default {
  name: "ArticlesEditMenu",
  components: { BaseLayout, ArticlesCard, CategoriesSide, ArticlesSide },
  computed: {
    edit() {
      return CategoriesStore;
    }
  },
  methods: {
    createCategory() {
      this.edit.state.newItem = "category";
    },
    createArticle() {
      this.edit.state.newItem = "article";
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

h3 {
  color: white;
}

.main-box {
  border: 1px solid black;
  width: 100%;
  background-color: rgba(48, 93, 120, 0.66);

  .add-buttons {
    display: flex;
    justify-content: flex-end;

    .buttons-wrapper {
      margin-left: auto;

      button {
        &:first-child {
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
