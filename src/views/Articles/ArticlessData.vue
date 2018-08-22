<template>
  <b-tabs position="is-boxed" class="block" expanded>
    <b-tab-item v-for="(category, i) in categories"
                :key="i"
                :label="category.name.data">
      <CategoryTable :category="category"></CategoryTable>
    </b-tab-item>
  </b-tabs>
</template>

<script>
  import CategoriesStore from '../../components/Edit/Articles/CategoriesStore';
  import CategoryTable from './CategoryTable';

  export default {
    name: "ArticlesData",
    components: {CategoryTable},
    data: () => ({
      edit: CategoriesStore,
    }),
    computed: {
      categories() {
        return this.getCategories();
      },
    },
    methods: {
      getCategories() {
        if (this.edit.state.hasLoaded) return this.edit.state.stores;
        else setTimeout(() => {this.categories();}, 100);
      }
    },
  };
</script>

<style scoped>

</style>
