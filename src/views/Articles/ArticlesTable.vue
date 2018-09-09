<template>
  <section>

    <div class="articles">
      <div class="article"
           v-for="(article, i) in category.articles"
           :key="i"
           @click="mouseIn(article)"
           @mouseenter="mouseIn(article)"
           @mouseleave="mouseOut()">
        <span class="name" :title="article.name">{{ article.name }}</span>
        <span class="description is-hidden-mobile" :title="article.description">
          {{ article.description }}
        </span>
        <span class="price">{{ article.price }} Chf</span>
      </div>
    </div>

  </section>
</template>

<script>
	import CategoriesStore from '../../components/Edit/Articles/CategoriesStore';

	export default {
		name: "ArticlesTable",
		props: {
			category: {type: Object}
		},
		data: () => ({
      timeout: 50,
      pulsedArticleId: null,
    }),
		computed: {
			articles() {return this.category.articles;},
		},
		methods: {
			mouseIn(data) {
				CategoriesStore.state.hoveredArticle = data.image;
				this.$emit('description', data.description)
			},
			mouseOut() {
				CategoriesStore.state.hoveredArticle = null;
			},
		},
    mounted() {

    }
	};
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .articles {
    display: block;
    width: 79%;
    margin: 0 auto 0 auto;
    @media screen and (max-width: 980px) {
      width: 100%;
    }

    .article {
      user-select: none;
      cursor: default;
      transition: all .5s ease;
      border-radius: 20px;
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid rgba(77, 87, 99, 0.24);
      background-color: transparent;
      padding: 0 10px 0 10px;
      &:not(:first-child) {
        margin-top: 15px;
      }
      &:hover {
        transition: all .5s ease;
        transition-delay: .2s;
        border-bottom-color: transparent;
        background-color: rgba(22, 125, 240, 0.37);
      }

      .name {
        width: 150px;
        min-width: 120px;
        font-size: 18px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #4C4C4C;

      }

      .description {
        width: 440px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .price {
        padding-left: 15px;
        padding-right: 15px;
        margin-left: auto;
        white-space: nowrap;
      }

    }
  }

</style>
