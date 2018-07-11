<template>
  <div class="field is-grouped">
    <p class="control">
      <button class="button is-success is-inverted" @click="commitEdit">
        <i class="far fa-check"></i>
      </button>
      <button class="button is-danger is-inverted"
              :disabled="disableCancel"
              @click="cancelEdit">
        <i class="far fa-times"></i>
      </button>
    </p>
  </div>
</template>

<script>
  import store from '../../Public/Promo/PromoStore';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "ValidationButtons",
    store: store,
    data() {
      return {
        disableCancel: false,
      }
    },
    computed: {
      ...mapGetters([
        'promoDirtyFlag'
      ]),
    },
    methods: {
      ...mapActions([
        'pushData',
        'recoverData',
      ]),

      commitEdit() {
        if (this.promoDirtyFlag) {
          this.disableCancel = false;
          this.pushData();
        }
        this.$emit('close-edit');
      },

      cancelEdit() {
        if (this.promoDirtyFlag) {
          this.disableCancel = true;
          setTimeout(()=> {this.disableCancel = false}, 3000);

          this.dirtyStore();
          return;
        }
        this.$emit('close-edit');
      },

      dirtyStore() {
        this.$snackbar.open({
          message: 'Les modifications seront perdues.',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'Continuer?',
          duration: 3000,
          indefinite: false,
          onAction: () => {
            this.recoverData();
            this.disableCancel = false;
            this.$emit('close-edit');
          }
        });
      },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .control {
    position: absolute;
    right: 30px;
    top: 20px;
    button {
      &:first-child {
        transition: background-color .2s, color .2s;
        margin-right: 10px;
        &:hover {
          transition: background-color .2s, color .2s;
          background-color: $is-success;
          color: white;
        }
      }
      &:last-child {
        transition: background-color .2s, color .2s;
        margin-right: 10px;
        &:hover {
          transition: background-color .2s, color .2s;
          background-color: $is-danger;
          color: white;
        }
      }
      i {
        font-size: 22px;
      }
    }
  }

</style>
