<template>
  <div>
    <section class="section">
      <div class="container custom-tabs-articles">
        <div class="mobile-description is-hidden-desktop">
          <transition name="fade">
            <small v-if="mobileDescription">{{ mobileDescription }}</small>
          </transition>
        </div>
        <b-tabs position="is-centered" class="block" v-model="activeTab"
                type="is-toggle-rounded">
          <b-tab-item v-for="(category, i) in stores" :key="i"
                      :label="category.name">
            <div class="content" :id="'Category'+category.id">

              <ArticlesTable :category="category"
                             @description="setMobileDescription">
              </ArticlesTable>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
    </section>
  </div>
</template>

<script>
	import EditIcon from '../../components/Edit/EditIcon';
	import ArticlesTable from './ArticlesTable';
	import CategoriesStore from '../../components/Edit/Articles/CategoriesStore';

	export default {
		name: "ArticlesData",
		components: {ArticlesTable, EditIcon},
		data: () => ({
			type: 'article',
			activeTab: 0,

      heightDelta: 40,
      step: 10,
      speed: 10,

			element: null,
			previousHeight: null,
			target: null,

      mobileDescription: false,
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
			},
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
			},
      setMobileDescription(data) {
				this.mobileDescription = false;
				setTimeout(() => {this.mobileDescription = data;}, 350);
      }
		},
		mounted() {
			setTimeout(() => {
				this.previousHeight = this.stores[0].count() * this.heightDelta;
			}, 1500);
		}
	};
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .content {
    transition: height .5s ease;
    height: 260px;
    margin-top: 40px;
  }

  .mobile-description{
    color: #777;
    text-align: center;
    margin-top: -30px;
    padding: 0 10px 10px 10px;
    height: 58px;
  }
</style>


