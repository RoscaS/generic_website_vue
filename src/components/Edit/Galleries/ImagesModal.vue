<template>
  <b-modal v-if="enable"
           :active.sync="modalSync"
           scroll="clip"
           :width="850"
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
    data() {
      return {
        // edit: GalleriesStore,
      }
    },
    computed: {
      edit() {return GalleriesStore},

      modalSync: {
        get() {
          return this.store == this.edit.active;},
        set(value) {if (!value) this.edit.end();}
      },
      cancelModalOptions() {
        return this.edit.loading ? [] : ['outside', 'x', 'escape'];
      }
    },
  };
</script>
