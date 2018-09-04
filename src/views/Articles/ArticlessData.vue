<template>
  <div>
    <section class="section">
      <div class="container custom-tabs-articles">
          <b-tabs position="is-centered" class="block" v-model="activeTab" type="is-boxed">
            <b-tab-item v-for="(category, i) in stores" :key="i" :label="category.name">
              <div class="content">
                <CategoryTable :category="category"></CategoryTable>
              </div>
            </b-tab-item>
          </b-tabs>
      </div>
    </section>
  </div>
</template>

<script>
  import EditIcon from '../../components/Edit/EditIcon';
  import CategoryTable from './ArticlesTable';
  import CategoriesStore from '../../components/Edit/Articles/CategoriesStore';

  export default {
    name: "ArticlesData",
    components: {CategoryTable, EditIcon},
    data: () => ({
      activeTab: 0,
      type: 'article',
    }),
    computed: {
      edit() {return CategoriesStore;},
      stores() {return CategoriesStore.state.stores;}
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';


  .content {
    margin-top: 40px;
  }
</style>


