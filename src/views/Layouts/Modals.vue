<template>
  <div v-show="authenticated">
    <ImagesModal/>
    <ArticlesModal/>
  </div>
</template>

<script>
	import ImagesModal from '../../components/Edit/Galleries/ImagesModal';
	import ArticlesModal from '../../components/Edit/Articles/ArticlesModal';

	export default {
		name: "Modals",
		components: {ImagesModal, ArticlesModal},
		data: () => ({
			imagesModal: false,
			articlesModal: false,
		}),
		methods: {
			authenticated() {
				return this.$auth.isAuthenticated();
			},
		}
	};
</script>

<style scoped>

</style>
