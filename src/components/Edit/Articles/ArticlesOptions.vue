<template>
  <div class="display-prices">
    <p>Afficher les prix</p>
    <b-checkbox class="checkbox"
                size="is-small"
                v-model="articlesPrice"
                type="is-warning">
    </b-checkbox>
  </div>
</template>

<script>
import Tools from "../../../utils/tools";

export default {
  name: "ArticlesOptions",
  computed: {
    articlesPrice: {
      get() {
        return this.$siteOptions.state.show_articles_price.data;
      },
      set(value) {
        this.$siteOptions.state.show_articles_price.data = value;
      }
    }
  },
  watch: {
    articlesPrice(value) {
      value
        ? Tools.message("articlesDisplayPrices")
        : Tools.message("articlesHidePrices");
      this.$siteOptions.update();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

.display-prices {
  display: flex;
  align-items: baseline;
  p {
    color: white;
  }
  .checkbox {
    margin-left: 15px;
  }
}
</style>
