<template>
  <b-modal v-if="enable"
           :active.sync="modalSync"
           scroll="clip"
           :width="850"
           :canCancel="cancelModalOptions"
           has-modal-card>
    <ArticlesEditMenu :edit="edit"/>
  </b-modal>
</template>

<script>
  import ArticlesEditMenu from './ArticlesEditMenu';
  import CategoriesStore from './CategoriesStore'

	export default {
		name: "ArticlesModal",
    components: {ArticlesEditMenu},
    props: {
      store: {type: Object},
      enable: {type: Boolean},
    },
    data: () => ({
    }),
    computed: {
      edit() {return CategoriesStore},

      modalSync: {
        get() {return this.store.state.active},
        set(value) {if (!value) this.edit.end();}
      },
      cancelModalOptions() {
        return this.edit.loading ? [] : ['outside', 'x', 'escape'];
      }
    },
	};
</script>

<style scoped>

</style>
