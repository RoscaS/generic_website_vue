<template>
  <div v-if="authenticated">
    <ImagesModal/>
    <ArticlesModal/>
    <TimeModal/>
  </div>
</template>

<script>
import ImagesModal from "../../components/Edit/Galleries/ImagesModal";
import ArticlesModal from "../../components/Edit/Articles/ArticlesModal";
import TimeModal from "../../components/Edit/Time/TimeModal";

export default {
  name: "Modals",
  components: { ImagesModal, ArticlesModal, TimeModal },
  data: () => ({
    imagesModal: false,
    articlesModal: false
  }),
  methods: {
    authenticated() {
      return this.$auth.isAuthenticated();
    }
  }
};
</script>

<style scoped>
</style>
