<template>
  <div>
    <button class="button is-danger"
            :style="style"
            :disabled="isActive"
            @click="startEdit">
      <i class="fal fa-pencil-alt">
      </i>
    </button>

    <b-modal v-if="editMenu == 'image'"
             :active.sync="showModal"
             scroll="clip"
             :width="850"
             :canCancel="cancelModalOptions"
             :onCancel="endEdit"
             has-modal-card>
      <ImagesEditMenu :store="store"/>
    </b-modal>
  </div>
</template>

<script>
  import GalleriesEditStore from './Galleries/GalleriesEditStore';
  import TextsEditStore from './Texts/TextsEditStore';
  import ImagesEditMenu from './Galleries/ImagesEditMenu';

  export default {
    name: "EditIcon",
    components: {ImagesEditMenu,},
    props: {
      right: {type: String},
      top: {type: String},
      component: {type: String},
      editMenu: {type: String, default: 'text'},
      store: {type: Object},
    },
    data() {
      return {
        showModal: false,
      };
    },
    computed: {
      edit() {
        return this.editMenu == 'text' ? TextsEditStore : GalleriesEditStore;
      },
      isActive() {
        return this.edit.active;
      },
      style() {
        return {marginTop: this.top, left: this.right};
      },
      cancelModalOptions() {
        return this.edit.loading ? [] : ['outside', 'x', 'escape'];
      }
    },
    methods: {
      is(component) {
        return this.edit.component == component;
      },
      startEdit() {
        this.edit.start(this.component);
        if (this.editMenu == 'image') this.showModal = true;
      },
      endEdit() {
        return this.edit.end();
      }
    },
    // mounted() {
    //   if (this.store) {
    //     console.log('\nEDITICON:');
    //     console.log(this.store.$options.related);
    //     console.log(this.store);
    //   }
    // }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .button {
    transition: .5s background-color ease;
    font-size: 20px;
    left: 50px;
    /*margin-top: 50px;*/
    position: absolute;
    z-index: 1;

    &:hover {
      transition: .5s background-color ease;
      background-color: #d03656;
    }
  }
</style>

