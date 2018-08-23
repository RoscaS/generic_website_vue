<template>
  <section>
    <EditPopup :edit="edit"></EditPopup>
    <div class="container">
      <div class="content">
        <transition name="fade">
          <div v-if="!edit.state.editPopup">
            <div class="box main-box">
              <div class="columns">
                <div class="column is-4">
                  <CategoriesEdit :categories="edit.state.stores"
                                  :edit="edit"/>
                </div>
                <div class="column is-8">
                  <h3>Articles</h3>
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
  import CategoriesEdit from './CategoriesEdit';
  import EditPopup from './EditPopup';

  export default {
    name: "ArticlesEditMenu",
    components: {CategoriesEdit, EditPopup},
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
