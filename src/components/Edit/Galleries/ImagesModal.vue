<template>
  <b-modal v-if="enable"
           :active.sync="modalSync"
           :canCancel="cancelModalOptions"
           has-modal-card>
    <ImagesEditMenu :store="store"/>
  </b-modal>
</template>

<script>
  import ImagesEditMenu from './ImagesEditMenu';
  import GalleriesStore from './GalleriesStore'

  export default {
    name: "ImagesModal",
    components: {ImagesEditMenu},
    props: {
      store: {type: Object},
      enable: {type: Boolean},
    },
    computed: {
      edit() {return GalleriesStore},

      modalSync: {
        get() {return this.store == this.edit.active;},
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
