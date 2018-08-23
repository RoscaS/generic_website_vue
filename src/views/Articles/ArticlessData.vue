<template>
  <section>
    <v-tabs fixed-tabs v-model="activeTab"
            color="white"
            slider-color="blue">
      <v-tab v-for="(category, i) in categories"
             :key="i"
             :ripple="false">
        {{ category.name.data }}
      </v-tab>
      <v-tab-item v-for="(category, i) in categories" :key="i">
        <div class="content">
          <CategoryTable :category="category"></CategoryTable>
        </div>
      </v-tab-item>
    </v-tabs>
  </section>
</template>

<script>

  import CategoryTable from './CategoryTable';

  export default {
    name: "ArticlesData",
    components: {CategoryTable},
    props: {
      categories: {type: Array}
    },
    data: () => ({
      activeTab: 0,
    }),
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .content {
    margin-top: 40px;
  }
</style>
