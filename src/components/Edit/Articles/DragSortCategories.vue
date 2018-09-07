<template>
  <draggable v-model="edit.state.stores"
             :options="dragOptions"
             :move="onMove"
             @start="isDragging=true"
             @end="isDragging=false">
    <transition-group type="transition"
                      :class=""
                      :name="reOrder? 'flip-store': ''">
      <slot></slot>
    </transition-group>
  </draggable>
</template>

<script>
	import draggable from 'vuedraggable';
	import CategoriesStore from './CategoriesStore';
	import tools from '../../../utils/tools';

	export default {
		name: "DragSortCategories",
		components: {draggable},
		data: () => ({
			edit: CategoriesStore,
			isDragging: false,
			delayedDragging: false,
			reOrder: false,
			lock: false,
		}),
		computed: {
			disabled() {
				return this.edit.state.draggingType !== 'category' || this.lock;
			},
			dragOptions() {
				return {
					animation: 250,
					group: 'description',
					disabled: this.disabled,
					ghostClass: 'none'
				};
			},
		},
		watch: {
			isDragging(newValue) {
				if (newValue) {
					if (this.this.edit.state.primaryStore || this.edit.state.primaryStore) {
						this.lock = true;
						tools.message('categoryCantChangeOrder');
					}
					this.delayedDragging = true;
					return;
				}
				this.$nextTick(() => {
					if (!this.lock) {
						this.edit.updatePosition();
						setTimeout(() => {
							tools.message('updated');
						}, 500);
					}
					this.lock = false;

				});
			}
		},
		methods: {
			onMove({relatedContext, draggedContext}) {
			},
		},
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

</style>
