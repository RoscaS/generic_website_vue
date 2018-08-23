<template>
  <section>
    <h3>Catégories</h3>

    <DragSortArticles :edit="edit">
      <CategoryBox v-for="(category, idx) in categories"
                   :key="idx"
                   :edit="edit"
                   :category="category">
      </CategoryBox>
    </DragSortArticles>
  </section>
</template>

<script>
  import CategoryBox from './CategoryBox'
  import DragSortArticles from './DragSortArticles'

	export default {
		name: "CategoriesEdit",
    components: {CategoryBox, DragSortArticles},
	  props: {
		  edit: {type: Object},
	    categories: {type: Array},
    },
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

</style>
