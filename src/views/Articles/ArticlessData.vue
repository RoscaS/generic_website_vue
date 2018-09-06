<template>
  <div>
    <section class="section">
      <div class="container custom-tabs-articles">
        <b-tabs position="is-centered" class="block" v-model="activeTab"
                type="is-toggle-rounded">
          <b-tab-item v-for="(category, i) in stores" :key="i"
                      :label="category.name">
            <div class="content" :id="'Category'+category.id">
              <CategoryTable :category="category"></CategoryTable>
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

	export default {
		name: "ArticlesData",
		components: {CategoryTable, EditIcon},
		data: () => ({
			type: 'article',
			activeTab: 0,


      heightDelta: 43,
      step: 10,
      speed: 10,

			element: null,
			previousHeight: null,
			target: null,
		}),
		computed: {
			edit() {return CategoriesStore;},
			stores() {return CategoriesStore.state.stores;},
		},
		watch: {
			activeTab(value) {
				const id = this.stores[value].id;
				const count = this.stores[value].count();

				this.element = document.getElementById(`Category${id}`);
				this.element.style.height = this.previousHeight + 'px';

				this.target = count * this.heightDelta;
        this.target > this.previousHeight ? this.grow() : this.shrink();
			}
		},
		methods: {
			grow() {
				if (this.target >= this.previousHeight) {
          this.element.style.height = this.previousHeight + 'px';
					setTimeout(() => {
            this.previousHeight += this.step;
						this.grow();
					}, this.speed);
				} else {
          this.previousHeight = this.target;
				}
			},
			shrink() {
				if (this.target <= this.previousHeight) {
          this.element.style.height = this.previousHeight + 'px';
					setTimeout(() => {
						this.previousHeight -= this.step;
						this.shrink();
					}, this.speed);
				} else {
          this.previousHeight = this.target
				}
			}
		},
		mounted() {
			setTimeout(() => {
				this.previousHeight = this.stores[0].count() * this.heightDelta;
			}, 1000);
		}
	};
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';


  .content {
    transition: height .5s ease;
    /*height: auto;*/
    height: 260px;
    margin-top: 40px;
  }
</style>


