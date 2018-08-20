<template>
  <div>
    <button class="button is-danger"
            :class="{smallIcon: small}"
            :style="style"
            :disabled="isActive"
            @click="startEdit">
      <i class="fal fa-pencil-alt"></i>
    </button>
    <ImagesModal v-if="showModal" :enable="showModal" :store="store"/>
  </div>
</template>

<script>
  import ImagesModal from './Galleries/ImagesModal';

  export default {
    name: "EditIcon",
    components: {ImagesModal},
    props: {
      right: {type: String},
      top: {type: String},
      edit: {type: Object},
      store: {type: Object},
      small: {type: Boolean, default: false},
    },
    data() {
      return {
        showModal: false,
        timeout: false,
      };
    },
    computed: {
      tools() {return this.$Global.Tools;},

      isActive() {
        return this.edit.state.active;
      },
      style() {
        return {marginTop: this.top, left: this.right};
      },
    },
    methods: {
      startEdit() {
        this.edit.start(this.store);
        this.showModal = this.edit.type == 'image';
      },
      sReveal(side, delay, distance = 100, duration = 1500) {
        return new this.tools.ScrollRevealOptions(
          side, delay, distance, duration
        );
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .smallIcon {
    font-size: 14px !important;
  }

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

