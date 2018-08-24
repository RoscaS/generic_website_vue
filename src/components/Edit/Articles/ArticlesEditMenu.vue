<template>
  <section>
    <EditPopup :edit="edit"></EditPopup>
    <div class="container">
      <div class="content">
        <transition name="fade">
          <div v-if="!edit.state.editPopup">
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
  import CategoriesSide from './CategoriesSide';
  import ArticlesSide from './ArticlesSide';
  import EditPopup from './EditPopup';

  export default {
    name: "ArticlesEditMenu",
    components: {CategoriesSide, ArticlesSide, EditPopup},
    props: {
      edit: {type: Object},
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .main-box {
    width: 100%;
    height: 600px;
    /*background-color: #45a875;*/
  }
</style>
