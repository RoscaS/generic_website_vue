<template>
  <section>
    <BaseLayout :store="store">
      <ArticlesCarousel v-scroll-reveal="sReveal('top', 100, 100, 1500)"/>

      <br><br>
    </BaseLayout>
    <EditIcon class="edit-icon"
              :store="categoriesStore"
              :edit="categoriesStore"/>
    <ArticlesData v-scroll-reveal="sReveal('bottom', 150, 100, 1500)"/>
  </section>
</template>

<script>

  import EditIcon from '../../components/Edit/EditIcon';
  import ViewsMixin from '../../mixins/ViewsMixin';

  import ArticlesData from './ArticlessData';
  import ArticlesCarousel from './ArticlesCarousel';

  import CategoriesStore from '../../components/Edit/Articles/CategoriesStore';

  export default {
    name: "Articles",
    mixins: [ViewsMixin],
    components: {EditIcon, ArticlesData, ArticlesCarousel},
    data: () => ({
      component: 'Article',
      type: 'text',
      categoriesStore: CategoriesStore,
    }),
    computed: {
      categories() {
        return this.getCategories();
      },
    },
    methods: {
      getCategories() {
        let categories = this.editTypes['article'];
        if (categories.state.hasLoaded) {
          return categories.state.stores;
        }
        else setTimeout(() => {return this.getCategories();}, 100);
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .poule {
    width: 120px;
  }

</style>
