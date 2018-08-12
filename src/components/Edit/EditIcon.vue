<template>
  <div>
    <button class="button is-danger"
            :style="style"
            :disabled="isActive"
            @click="startEdit">
      <i class="fal fa-pencil-alt">
      </i>
    </button>

    <b-modal v-if="edit.type == 'image'"
             :active.sync="showModal"
             scroll="clip"
             :width="850"
             :canCancel="cancelModalOptions"
             has-modal-card>
      <ImagesEditMenu :store="store"/>
    </b-modal>
  </div>
</template>

<script>
  import ImagesEditMenu from './Galleries/ImagesEditMenu';

  export default {
    name: "EditIcon",
    components: {ImagesEditMenu,},
    props: {
      right: {type: String},
      top: {type: String},
      edit: {type: Object},
      store: {type: Object},
    },
    data() {
      return {
        showModal: false,
      };
    },
    computed: {
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
      startEdit() {
        if (this.edit.type == 'image') this.showModal = true;
        else this.edit.start(this.store.related);
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .button {
    transition: .5s background-color ease;
    font-size: 20px;
    left: 50px;
    position: absolute;
    z-index: 1;

    &:hover {
      transition: .5s background-color ease;
      background-color: #d03656;
    }
  }
</style>

