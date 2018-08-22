<template>
  <BaseLayout :store="store">
    <ArticlesCarousel></ArticlesCarousel>
    <br>
    <br>
    <ArticlesData></ArticlesData>
  </BaseLayout>
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
    mounted() {
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .poule {
    width: 120px;
  }

</style>
