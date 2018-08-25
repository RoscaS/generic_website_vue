<template>
  <section>
    <EditPopup></EditPopup>
    <NewItem></NewItem>
    <div class="container">
      <div class="content">
        <transition name="fade">
          <div v-if="!edit.state.editItem && !edit.state.newItem">
            <div class="box main-box">
              <div class="columns is-variable is-4 is-mobile">
                <div class="column is-3">
                  <CategoriesSide :categories="edit.state.stores" :edit="edit"/>
                </div>
                <div class="column">
                  <ArticlesSide></ArticlesSide>
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

  import CategoriesSide from './CategoriesSide';
  import ArticlesSide from './ArticlesSide';
  import EditPopup from './EditPopup';
  import NewItem from './NewItem';

  export default {
    name: "ArticlesEditMenu",
    components: {CategoriesSide, ArticlesSide, EditPopup, NewItem},
    computed: {
      edit() {return CategoriesStore;},
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .main-box {
    width: 100%;
    height: 600px;
    background-color: rgba(48, 93, 120, 0.66);
    /*background-color: rgba(48, 93, 120, 0.53);*/
  }
</style>
