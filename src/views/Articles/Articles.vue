<template>
  <section>
    <BaseLayout :store="store">
      <ArticlesCarousel></ArticlesCarousel>
      <br>
      <br>
    </BaseLayout>
    <ArticlesData></ArticlesData>
  </section>
</template>

<script>

  import EditIcon from '../../components/Edit/EditIcon';
  import ViewsMixin from '../../mixins/ViewsMixin';

  import ArticlesData from './ArticlessData';
  import ArticlesCarousel from './ArticlesCarousel';


  export default {
    name: "Articles",
    mixins: [ViewsMixin],
    components: {EditIcon, ArticlesData, ArticlesCarousel},
    data: () => ({
      component: 'Article',
      type: 'text',
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
