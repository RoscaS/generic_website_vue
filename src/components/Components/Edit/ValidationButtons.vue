<template>
  <div class="field is-grouped">
    <p class="control">
      <button class="button is-success is-inverted" @click="commitChanges">
        <i class="far fa-check"></i>
      </button>
      <button class="button is-danger is-inverted"
              :disabled="disabledCancelBtn"
              @click="cancelChanges">
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
        disabledCancelBtn: false,
        timeout: 5000,
      };
    },
    computed: {
      ...mapGetters([
        'promoDirtyFlag',
        'promoLoadingFlag',
      ]),

      loading: {
        get() { return this.promoLoadingFlag; },
      }
    },
    methods: {
      ...mapActions([
        'pushData',
        'recoverData',
      ]),

      commitChanges() {
        if (this.promoDirtyFlag) {
          this.disabledCancelBtn = false;
          this.pushData();
        }
        this.toggleLoading();
      },

      cancelChanges() {
        if (this.promoDirtyFlag) {
          this.disabledCancelBtn = true;
          setTimeout(() => {this.disabledCancelBtn = false;}, this.timeout);
          this.storeIsDirty();
          return;
        }
        this.$emit('close-edit');
      },

      toggleLoading() {
        this.$emit('is-loading');
        this.checkLoading();
      },

      checkLoading() {
        this.loading ? setTimeout(() => {this.checkLoading();}, 100)
                     : this.$emit('close-edit');
      },

      storeIsDirty() {
        this.$snackbar.open({
          message: 'Les modifications seront perdues.',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'Continuer?',
          duration: this.timeout,
          indefinite: false,
          onAction: () => {
            this.recoverData();
            this.disabledCancelBtn = false;
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
