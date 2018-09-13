<template>
  <section>
    <h3>Catégories:</h3>
    <DragSortCategories>
      <CategoryBox v-for="(category, idx) in categories"
                   :key="idx"
                   :edit="edit"
                   :category="category">
      </CategoryBox>
    </DragSortCategories>
  </section>
</template>

<script>
import CategoryBox from "./CategoryBox";
import DragSortCategories from "./DragSortCategories";

export default {
  name: "CategoriesEdit",
  components: { CategoryBox, DragSortCategories },
  props: {
    edit: { type: Object },
    categories: { type: Array }
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

section {
  min-height: 400px;
}

h3 {
  color: white;
}
</style>
