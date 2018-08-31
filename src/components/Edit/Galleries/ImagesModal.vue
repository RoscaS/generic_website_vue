<template>
  <b-modal :active.sync="modalSync"
           :canCancel="cancelModalOptions"
           has-modal-card>
    <ImagesEditMenu :store="store"/>
  </b-modal>
</template>

<script>
	import ImagesEditMenu from './ImagesEditMenu';
	import GalleriesStore from './GalleriesStore';

	export default {
		name: "ImagesModal",
		components: {ImagesEditMenu},
		computed: {
			edit() {return GalleriesStore;},
			store() {return this.edit.active;},

			modalSync: {
				get() {return !!this.store;},
				set(value) {if (!value) this.edit.end();}
			},
			cancelModalOptions() {
				if (this.edit.state.editItem || this.edit.loading) return [];
				else return ['outside', 'x', 'escape'];
			}
		},
	};
</script>

<style scoped lang="scss">
</style>
