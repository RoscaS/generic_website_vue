<template>
  <b-modal :active.sync="modalSync"
           scroll="clip"
           :canCancel="cancelModalOptions"
           has-modal-card>
    <ArticlesEditMenu/>
  </b-modal>
</template>

<script>
  import ArticlesEditMenu from './ArticlesEditMenu';
  import CategoriesStore from './CategoriesStore';

	export default {
		name: "ArticlesModal",
    components: {ArticlesEditMenu},
    data: () => ({
    }),
    computed: {
      edit() {return CategoriesStore},

      modalSync: {
        get() {return this.edit.state.active},
        set(value) {if (!value) this.edit.end();}
      },
      cancelModalOptions() {
        let a = this.edit.state.newItem || this.edit.state.editItem;
        if (a || this.edit.loading) return [];
        else return ['outside', 'x', 'escape'];
      }
    },
	};
</script>

<style scoped>

</style>
