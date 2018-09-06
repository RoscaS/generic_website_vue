<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-9">
        <div class="card"
             v-for="(article, i) in category.articles"
             :key="i"
             @mouseenter="mouseIn(article)"
             @mouseleave="mouseOut()">
          <header class="card-header level">
            <div class="level-left">

              <div class="level-item">
                <span class="name">{{article.name}}</span>
              </div>

              <div class="level-item">
                <span class="description">{{article.description}}</span>
              </div>
            </div>

            <div class="level-right">
              <div class="level-item pprice">
                <span class="price">{{article.price}} chf</span>
              </div>
            </div>
          </header>
        </div>
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
    }),
		computed: {
			articles() {return this.category.articles;}
		},
		methods: {
			mouseIn(data) {
				CategoriesStore.state.hoveredImage = data.image;
				setTimeout(() => {}, 500);
			},
			mouseOut() {
				CategoriesStore.state.hoveredImage = null;
			},
		},
    mounted() {

    }
	};
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .columns {
    .card {
      cursor: default;
      transition: background-color .5s ease;
      border-radius: 20px;
      margin-bottom: 10px;
      box-shadow: none;
      background-color: transparent;

      &:hover {
        transition: background-color .5s ease;
        transition-delay: .2s;
        background-color: $is-info;

      }

      .card-header {
        transition: border-bottom-color .5s ease;
        box-shadow: none;
        border-bottom: 1px solid lightgray;

        &:hover {
          transition: border-bottom-color .5s ease;
          transition-delay: .2s;
          border-bottom-color: transparent;
        }

        .level-left {
          margin-left: 10px;
          .diez {
            font-weight: lighter;
            font-size: 25px;
            opacity: 0.35;
            z-index: 1;
          }

          .name {
            width: 150px;
            font-size: 20px;
            padding-top: 0;
            padding-bottom: 0;
            color: #4C4C4C;
          }

          .description {

            width: 310px;
            /*font-weight: lighter;*/
          }
        }

        .level-right {
          margin-right: 15px;

          .price {
          }
        }
      }
    }
  }


</style>
