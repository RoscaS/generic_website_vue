<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="content">
          <v-tabs fixed-tabs v-model="activeTab"
                  color="white"
                  slider-color="blue">
            <v-tab v-for="(category, i) in stores"
                   :key="i"
                   :ripple="false">
              {{ category.name }}
            </v-tab>
            <v-tab-item v-for="(category, i) in stores" :key="i">
              <div class="content">
                <CategoryTable :category="category"></CategoryTable>
              </div>
            </v-tab-item>
          </v-tabs>
        </div>
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
