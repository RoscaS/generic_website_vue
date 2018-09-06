<template>
  <div>
    <section class="section">
      <div class="container custom-tabs-articles">
        <b-tabs position="is-centered" class="block" v-model="activeTab"
                type="is-toggle-rounded">
          <b-tab-item v-for="(category, i) in stores" :key="i"
                      :label="category.name">
            <div class="content" :style="">
              <CategoryTable :category="category" class=""></CategoryTable>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
    </section>
  </div>
</template>

<script>
	import EditIcon from '../../components/Edit/EditIcon';
	import CategoryTable from './ArticlesTable';
	import CategoriesStore from '../../components/Edit/Articles/CategoriesStore';

	import smoothReflow from 'vue-smooth-reflow';

	export default {
		name: "ArticlesData",
		mixins: [smoothReflow],
		components: {CategoryTable, EditIcon},
		data: () => ({
			activeTab: 0,
			type: 'article',
		}),
		computed: {
			edit() {return CategoriesStore;},
			stores() {return CategoriesStore.state.stores;},
		},
    methods: {
			// dynamicHeight(category) {
			// 	console.log('ici')
			// 	return `heigh:${category.count()*40}px ;transition: height .5s ease`
      // }
    },
		mounted() {
			// this.$smoothReflow({
				// el: '.POULE',
				// property: ['height', 'width'],
				// transition: 'height .25s ease-in-out, width .75s ease-out'
			// });
		}
	};
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .content {
    transition: height .5s ease;
    /*height: auto;*/
    margin-top: 40px;
  }
</style>


